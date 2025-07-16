# backend/utils/dynamic_filter_builder.py

from sqlalchemy.sql import operators
from sqlalchemy.sql.elements import BinaryExpression
from backend.models.log_entry import LogEntry
from typing import List, Any, Dict
from sqlalchemy import and_

def build_dynamic_conditions(filters: Dict[str, Dict[str, Any]]) -> List[BinaryExpression]:
    conditions = []

    for field_name, ops in filters.items():
        for op, value in ops.items():
            col = LogEntry.log_type_data[field_name]
            if op == "eq":
                conditions.append(col == value)
            elif op == "gt":
                conditions.append(col.as_integer() > value)
            elif op == "lt":
                conditions.append(col.as_integer() < value)
            elif op == "contains":
                conditions.append(col.as_string().ilike(f"%{value}%"))
            else:
                raise ValueError(f"Unsupported filter op: {op}")
    
    return conditions
