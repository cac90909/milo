from typing import Type, Any, Dict, List
from pydantic import BaseModel, ValidationError
from sqlalchemy.ext.asyncio import AsyncSession
from backend.registry.log_type_registry import LOG_TYPE_REGISTRY
from backend.models.log_entry import LogEntry


def parse_log_type_data(log_type: str, log_type_data: Dict) -> BaseModel:
    log_entry_type = LOG_TYPE_REGISTRY.get(log_type, None)
    if not isinstance(log_entry_type, Type[BaseModel]):
        raise ValueError(f"Unrecognized log type: {log_type}")
    try:
        log_type_data_ins = log_entry_type(**log_type_data)
    except ValidationError as ve:
        raise ValueError(f"Invalid data for log entry: {log_type_data}")
    return log_type_data_ins



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