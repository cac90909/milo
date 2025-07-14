# backend/log_types/movie_log.py
from pydantic import BaseModel

class MovieLogData(BaseModel):
    rating: int
    genre: str
    watched_on: str
