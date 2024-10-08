/*
Manages the connection to the PostgreSQL database
and provides functions for inserting and retrieving messages from the database.
*/

import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Use destructuring to get Pool and QueryResult from the pg package
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Define types for User and Message
export interface User {
    id: number;
    username: string;
    password: string;
    created_at: Date;
}

export interface Message {
    id: number;
    user_id: number;
    sender: string;
    content: string;
    sent_at: Date;
}


// Function to create a new user
export const createUser = async (username: string, hashedPassword: string): Promise<User> => {
    try {
        const result: pkg.QueryResult<User> = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Function to find a user by username
export const findUserByUsername = async (username: string): Promise<User | null> => {
    try {
        const result: pkg.QueryResult<User> = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error finding user by username:', error);
        throw error;
    }
};

// Function to insert a message into the database
export const insertMessage = async (user_id: number, sender: string, content: string): Promise<Message> => {
    try {
        console.log(`Inserting message into DB: sender=${sender}, content=${content}`);
        const result: pkg.QueryResult<Message> = await pool.query(
            'INSERT INTO messages (user_id, sender, content) VALUES ($1, $2, $3) RETURNING *',
            [user_id, sender, content]
        );
        console.log('Message inserted:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error inserting message into the database:', error);
        throw error;
    }
};

// Function to retrieve all messages (for reference)
export const getAllMessages = async (user_id:number): Promise<Message[]> => {
    try {
        const result: pkg.QueryResult<Message> = await pool.query(
            'SELECT * FROM messages ORDER BY sent_at ASC',
            [user_id]
        );
        return result.rows;
    } catch (error) {
        console.error('Error retrieving messages:', error);
        throw error;
    }
};

// Function to get all messages for a specific user
export const getMessagesForUser = async (userId: number): Promise<Message[]> => {
    try {
        const result: pkg.QueryResult<Message> = await pool.query(
            'SELECT * FROM messages WHERE user_id = $1 ORDER BY sent_at ASC',
            [userId]
        );
        return result.rows;
    } catch (error) {
        console.error('Error retrieving messages for user:', error);
        throw error;
    }
};
