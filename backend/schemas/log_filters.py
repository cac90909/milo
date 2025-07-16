from typing import Any, Dict, Optional
from pydantic import BaseModel

class DynamicFilter(BaseModel):
    log_type: Optional[str]
    filters: Dict[str, Dict[str, Any]]  # e.g., "rating" → {"gt": 8}