import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()
db_host = os.getenv('DB_HOST')
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASS')
db_port = os.getenv('DB_PORT')

try:
    db = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        port=db_port
    )
    print("Database connection successful")
    db.close()
    exit(0)
except Exception as e:
    print("Database connection unsuccessful")
    print(e)
    exit(1)