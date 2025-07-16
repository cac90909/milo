from typing import Type, Any, Dict, List
from pydantic import BaseModel, ValidationError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import and_
from backend.registry.log_type_registry import LOG_TYPE_REGISTRY
from backend.models.log_entry import LogEntry
from backend.utils.filter_builder import build_dynamic_conditions
from backend.schemas.log_filters import DynamicFilter


def parse_log_type_data(log_type: str, log_type_data: Dict) -> BaseModel:
    log_entry_type = LOG_TYPE_REGISTRY.get(log_type, None)
    if not isinstance(log_entry_type, Type[BaseModel]):
        raise ValueError(f"Unrecognized log type: {log_type}")
    try:
        log_type_data_ins = log_entry_type(**log_type_data)
    except ValidationError as ve:
        raise ValueError(f"Invalid data for log entry: {log_type_data}")
    return log_type_data_ins

def validate_log_type(log_type: str) -> bool:
    log_entry_type = LOG_TYPE_REGISTRY.get(log_type, None)
    if log_entry_type:
        return True
    else:
        raise ValueError(f"Unrecognized log type: {log_type}")

async def create_log_entry(
    db: AsyncSession,
    log_type: str,
    title: str,
    text: str,
    log_type_data: Dict[str, Any],
) -> LogEntry:
    log_type_data_ins = parse_log_type_data(log_type, log_type_data)
    entry = LogEntry(log_type=log_type,title=title,text=text,data=log_type_data_ins.model_dump())
    db.add(entry)
    await db.commit()
    await db.refresh(entry)
    return entry

async def create_bulk_log_entries(
        db: AsyncSession, 
        log_type_list: List[str],
        title_list: List[str],
        text_list: List[str],
        data_list: List[Dict[str, Any]]) -> list[LogEntry]:
    new_logs = []
    if not (len(log_type_list) == len(title_list) == len(text_list) == len(data_list)):
        raise Exception(f"Inputted Lists of Log Entry Parameters were of varying lengths")
    for log_type, title, text, data in (log_type_list, title_list, text_list, data_list):
        try:
            log_type_data_ins = parse_log_type_data(log_type, data)
            entry = LogEntry(log_type=log_type,title=title,text=text,data=log_type_data_ins.model_dump())
            new_logs.append(entry)
        except Exception as e:
            print(f"Error creating log with info: {log_type, title, text, data} -- {e}")
    db.add_all(new_logs)
    await db.commit()
    for log in new_logs:
        await db.refresh(log)
    return new_logs

async def get_all_logs(db: AsyncSession) -> List[LogEntry]:
    """
    Result is the lazyily loaded results.
    .scalars seperates a big tuple of ORM objects into a list of many ORM objects
    .all loads the results (necessary bc they only lazily exist up until that point)
    """
    query = select(LogEntry)
    result = await db.execute(query)
    return result.scalars().all()

async def get_filtered_logs(db: AsyncSession, filter: DynamicFilter):
    stmt = select(LogEntry)
    conditions = []

    if filter.log_type:
        validate_log_type(filter.log_type)
        conditions.append(LogEntry.log_type == filter.log_type)

    if filter.filters:
        dynamic_conditions = build_dynamic_conditions(filter.filters)
        conditions.extend(dynamic_conditions)

    if conditions:
        stmt = stmt.where(and_(*conditions))

    result = await db.execute(stmt)
    return result.scalars().all()