# backend/models/log_entry.py
from sqlalchemy import Column, Integer, String, DateTime, JSON, func
from backend.db.db import Base


class LogEntry(Base):
    __tablename__ = "log_entries"

    id = Column(Integer, primary_key=True, index=True)
    log_type = Column(String, index=True)
    title = Column(String, nullable=True)
    text = Column(String, nullable=True)
    tags = Column(JSON, default=list)
    log_type_data = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
