import mysql.connector
import random
import hashlib
import uuid
import string
import datetime
from tqdm import tqdm
import os
from dotenv import load_dotenv

target = 20000
step = 20000

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

progress = tqdm(total=target, desc='Generating users', unit='users')

db_tables = ['users']
db_columns = ['id', 'name', 'email', 'passhash', 'salt', 'created_at', 'updated_at']

cursor = db.cursor()
cursor.execute("CREATE DATABASE IF NOT EXISTS test_for_sds")
cursor.execute("CREATE TABLE IF NOT EXISTS test_for_sds.users (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), passhash VARCHAR(255), salt VARCHAR(255), created_at DATETIME, updated_at DATETIME)")

possible_first_names = ['Alex', 'Bob', 'Charlie', 'David', 'Evan', 'Frank', 'George', 'Harry', 'Ivan', 'John', 'Kevin', 'Larry', 'Mike', 'Nathan', 'Oscar', 'Peter', 'Quentin', 'Robert', 'Sam', 'Tom', 'Victor', 'William', 'Xavier', 'Yuri', 'Zach', 'Alice', 'Bella', 'Catherine', 'Diana', 'Eva', 'Fiona', 'Gina', 'Helen', 'Irene', 'Jane', 'Kate', 'Linda', 'Maria', 'Natalie', 'Olivia', 'Pamela', 'Rachel', 'Sarah', 'Tina', 'Ursula', 'Victoria', 'Wendy', 'Xenia', 'Yvonne', 'Zoe']
possible_last_names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Lopez', 'Lee', 'Gonzalez', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Perez', 'Hall', 'Young', 'Allen', 'Sanchez', 'Wright', 'King', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Hill', 'Ramirez', 'Campbell', 'Mitchell', 'Roberts', 'Carter', 'Phillips', 'Evans', 'Turner', 'Torres', 'Parker', 'Collins', 'Edwards', 'Stewart', 'Flores', 'Morris', 'Nguyen', 'Murphy', 'Rivera', 'Cook', 'Rogers', 'Morgan', 'Peterson', 'Cooper', 'Reed', 'Bailey', 'Bell', 'Gomez', 'Kelly', 'Howard', 'Ward', 'Cox', 'Diaz', 'Richardson', 'Wood', 'Watson', 'Brooks', 'Bennett', 'Gray', 'James', 'Reyes', 'Cruz', 'Hughes', 'Price', 'Myers', 'Long', 'Foster', 'Sanders', 'Ross', 'Morales', 'Powell', 'Sullivan', 'Russell', 'Ortiz', 'Jenkins', 'Gutierrez', 'Perry', 'Butler', 'Barnes', 'Fisher']
possible_emails = ['gmail.com', 'yahoo.com', 'hotmail.com', 'aol.com', 'mail.com', 'mail.kz', 'outlook.com', 'icloud.com']
email_weights = [0.75, 0.1, 0.05, 0.05, 0.025, 0.025, 0.05, 0.05]
def randomDate(start, end):
    return start + datetime.timedelta(seconds=random.randint(0, int((end - start).total_seconds())))

def randomUser():
    userId = str(uuid.uuid4())
    first_name = random.choice(possible_first_names)
    last_name=random.choice(possible_last_names)
    name = first_name + ' ' + last_name
    email = random.choice([last_name + ' ' + first_name, name]).replace(' ', random.choice(['.', '_', ''])).lower() + random.choice([str(random.randint(0, 100)), '']) + '@' + random.choices(possible_emails, weights=email_weights)[0]
    salt = uuid.uuid4().hex
    password = random.choice([''.join(random.choice(string.ascii_uppercase + string.digits + string.ascii_lowercase + string.punctuation) for _ in range(8))]*3)
    passhash = hashlib.sha512((password + salt).encode('utf-8')).hexdigest()
    dates = [randomDate(datetime.datetime(2020, 1, 1), datetime.datetime(2023, 12, 31)), randomDate(datetime.datetime(2020, 1, 1), datetime.datetime(2023, 12, 31))]
    created_at = min(dates)
    updated_at = max(dates)
    user = [userId, name, email, passhash, salt, created_at, updated_at]
    return user

def insertUsers():
    for i in range(0, target, step):
        users = []
        for j in range(step):
            users.append(randomUser())
            progress.update(1)
        cursor.executemany("INSERT INTO test_for_sds.users (id, name, email, passhash, salt, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s)", users)
        db.commit()

insertUsers()
cursor.close()
db.close()

progress.close()
print('Done')
