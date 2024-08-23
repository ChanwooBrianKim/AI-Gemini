/*
Manages the connection to the PostgreSQL database
and provides functions for inserting and retrieving messages from the database.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
// Function to create a new user
export const createUser = (username, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
        return result.rows[0];
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
});
// Function to find a user by username
export const findUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0] || null;
    }
    catch (error) {
        console.error('Error finding user by username:', error);
        throw error;
    }
});
// Function to insert a message into the database
export const insertMessage = (sender, content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Inserting message into DB: sender=${sender}, content=${content}`);
        const result = yield pool.query('INSERT INTO messages (sender, content) VALUES ($1, $2) RETURNING *', [sender, content]);
        console.log('Message inserted:', result.rows[0]);
        return result.rows[0];
    }
    catch (error) {
        console.error('Error inserting message into the database:', error);
        throw error;
    }
});
// Function to retrieve all messages (for reference)
export const getAllMessages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query('SELECT * FROM messages ORDER BY sent_at ASC');
        return result.rows;
    }
    catch (error) {
        console.error('Error retrieving messages:', error);
        throw error;
    }
});
