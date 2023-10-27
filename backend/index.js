/*
    * This is the backend server for the It's Me app. This app is a digital identity manager, allowing users to store and share their personal information with other users and apps. It also allows people to verify certain information about themselves, such as their age or their vaccination status. It allows businesses to issue work credentials to replace physical ID cards. It allows users to store their own credentials, such as their driver's license or passport, and share them with other users or apps. It allows users to store their own medical records, and share them with other users or apps. It allows users to store their own financial records, and share them with other users or apps. It allows users to store their own educational records, and share them with other users or apps. It allows users to store their own employment records, and share them with other users or apps. It allows users to store their own social media records, and share them with other users or apps.
    * This app is built using the MERN stack. The frontend is built using React, and the backend is built using Node.js and Express. The database is MongoDB.
*/

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const sqlite3 = require('sqlite3').verbose();

// Database setup
// If in production, use the mariadb database via the database url
// Otherwise, use the sqlite3 database
let db;

if (process.env.NODE_ENV === 'production') {
    const mariadb = require('mariadb');
    const pool = mariadb.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        connectionLimit: 5
    });
    db = pool;
    } else {
    db = new sqlite3.Database('./db.sqlite3', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });
}

// Set up the express app
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  Define all the user types
const userTypes = {
    SUPERADMIN: 'superadmin',
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    ISSUER: 'issuer',
    VERIFIER: 'verifier',
    USER: 'user'
};

// Define role ids
const roleIds = {
    SUPERADMIN: 2,
    ADMIN: 3,
    MODERATOR: 5,
    ISSUER: 7,
    VERIFIER: 11,
    USER: 13
};

// Define all the user statuses
const userStatuses = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    DELETED: 'deleted'
};

// Define all of the permissions and their authorization values
// The authorization values are the product of all the role ids that have that permission. We can then check if a user has a permission by checking if the user's role id is divisible by the authorization value.
const permissions = {
    CREATE_USER: 2 * 3 * 5,
    READ_USER: 2 * 3 * 5 * 11,
    UPDATE_USER: 2 * 3 * 5,
    DELETE_USER: 2 * 3 * 5,
    VERIFY_USER: 2 * 3 * 5 * 11,
    SUSPEND_USER: 2 * 3 * 5,

    CREATE_ORGANIZATION: 2 * 3 * 5,
    ISSUE_CREDENTIAL: 2 * 3 * 5 * 7,
    VERIFY_CREDENTIAL: 2 * 3 * 5 * 11,
    SUSPEND_CREDENTIAL: 2 * 3 * 5 * 7,
    DELETE_CREDENTIAL: 2 * 3 * 5 * 7
};