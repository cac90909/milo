from pydantic import BaseModel
from typing import Any, Dict, List

class CreateLogRequest(BaseModel):
    log_type: str
    title: str
    text: str
    data: Dict[str, Any]

class CreateBulkLogRequest(BaseModel):
    log_type_list: List[str]
    title_list: List[str]
    text_list: List[str]
    data_list: List[Dict[str, Any]]
