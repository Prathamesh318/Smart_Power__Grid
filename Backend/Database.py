import psycopg2
from psycopg2.extras import RealDictCursor

def get_db():
    return psycopg2.connect(
        dbname=os.environ.get("PG_DB"),
        user=os.environ.get("PG_USER"),
        password=os.environ.get("PG_PASSWORD"),
        host=os.environ.get("PG_HOST"),
        cursor_factory=RealDictCursor
    )