from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from backend.db.db import get_db
from backend.schemas.log_request import CreateLogRequest, CreateBulkLogRequest
from backend.schemas.log_response import LogEntryResponse
from backend.services import log_service
from backend.models.log_entry import LogEntry

router = APIRouter(prefix="/logs", tags=["Logs"])

@router.post("/", response_model=LogEntryResponse)
async def create_log(
    log: CreateLogRequest,
    db: AsyncSession = Depends(get_db)
):
    try:
        new_log = await log_service.create_log_entry(
            db=db,
            log_type=log.log_type,
            title=log.title,
            text=log.text,
            data=log.data
        )
        return new_log
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/bulk", response_model=List[LogEntryResponse])
async def create_logs(
    logs: CreateBulkLogRequest, 
    db: AsyncSession = Depends(get_db)):
    try:
        new_log_list = await log_service.create_bulk_log_entries(
            db=db,
            log_type_list=logs.log_type_list,
            title_list=logs.title_list,
            text_list=logs.text_list,
            data_list=logs.data_list
        )
        return new_log_list
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

