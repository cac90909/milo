from typing import Type, Dict
from pydantic import BaseModel
from backend.schemas.log_entry_types import MovieLogData

LOG_TYPE_REGISTRY: Dict[str, Type[BaseModel]] = {
    "movie": MovieLogData
}