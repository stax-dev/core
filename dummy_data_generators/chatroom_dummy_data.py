import mysql.connector
import random
import hashlib
import uuid
import string
import datetime
from tqdm import tqdm
import os
from dotenv import load_dotenv

target = 1500
step = 150

load_dotenv()
db_host = os.getenv('DB_HOST')
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASS')
db_port = os.getenv('DB_PORT')

db = mysql.connector.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    port=db_port
)

progress = tqdm(total=target, desc='Generating chatrooms', unit='rooms')

db_tables = ['users']
db_columns = ['id', 'type', 'participants', 'created_at', 'updated_at']

cursor = db.cursor()
cursor.execute("CREATE DATABASE IF NOT EXISTS test_for_sds")
cursor.execute("CREATE TABLE IF NOT EXISTS test_for_sds.chatrooms (id VARCHAR(255) PRIMARY KEY, type VARCHAR(255), participants TEXT, created_at DATETIME, updated_at DATETIME)")

chatroom_types = ['private', 'server', 'group', 'support', 'client']

def randomDate(start, end):
    return start + datetime.timedelta(seconds=random.randint(0, int((end - start).total_seconds())))

def randomParticipants(chatroom_type):
    participants = []
    if chatroom_type == 'private':
        cursor.execute("SELECT id FROM test_for_sds.users ORDER BY RAND() LIMIT 2")
        user_ids = cursor.fetchall()
        for user_id in user_ids:
            participants.append(user_id[0])
    elif chatroom_type == 'server':
        for i in range(0, random.randint(2, 10)):
            cursor.execute("SELECT id FROM test_for_sds.users ORDER BY RAND() LIMIT 1")
            user_id = cursor.fetchone()[0]
            participants.append(user_id)
    elif chatroom_type == 'group':
        for i in range(0, random.randint(2, 10)):
            cursor.execute("SELECT id FROM test_for_sds.users ORDER BY RAND() LIMIT 1")
            user_id = cursor.fetchone()[0]
            participants.append(user_id)
    elif chatroom_type == 'support':
        cursor.execute("SELECT id FROM test_for_sds.users ORDER BY RAND() LIMIT 2")
        user_ids = cursor.fetchall()
        for user_id in user_ids:
            participants.append(user_id[0])
    elif chatroom_type == 'client':
        for i in range(0, random.randint(2, 100)):
            cursor.execute("SELECT id FROM test_for_sds.users ORDER BY RAND() LIMIT 1")
            user_id = cursor.fetchone()[0]
            participants.append(user_id)
    else:
        return None
    participant_string = ','.join(participants)
    return participant_string

def generateChatroom():
    chatroom_id = str(uuid.uuid4())
    chatroom_type = random.choice(chatroom_types)
    chatroom_participants = randomParticipants(chatroom_type)
    dates = [randomDate(datetime.datetime(2020, 1, 1), datetime.datetime(2023, 12, 31)), randomDate(datetime.datetime(2020, 1, 1), datetime.datetime(2023, 12, 31))]
    created_at = min(dates)
    updated_at = max(dates)
    chatroom = [chatroom_id, chatroom_type, chatroom_participants, created_at, updated_at]
    return chatroom

def insertChatrooms():
    for i in range(0, target, step):
        chatrooms = []
        for j in range(step):
            chatrooms.append(generateChatroom())
            progress.update(1)
        cursor.executemany("INSERT INTO test_for_sds.chatrooms (id, type, participants, created_at, updated_at) VALUES (%s, %s, %s, %s, %s)", chatrooms)
        db.commit()

insertChatrooms()
cursor.close()
db.close()

progress.close()
print('Done')

