from datetime import datetime
from typing import Dict, Any
from pydantic import BaseModel

class LogEntryResponse(BaseModel):
    id: int
    log_type: str
    title: str
    text: str
    data: Dict[str, Any]
    created_at: datetime

    class Config:
        orm_mode = True