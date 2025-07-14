from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base
from contextlib import asynccontextmanager
from typing import AsyncGenerator

# Replace with your actual DB URL
DATABASE_URL = "sqlite+aiosqlite:///./test.db"

# Async engine + session
engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = async_sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

# For SQLAlchemy model declarations
Base = declarative_base()

# Dependency to be used in FastAPI routes/services
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session