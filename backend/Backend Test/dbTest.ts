// import pkg from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();

// const { Pool, QueryResult } = pkg;

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
// });

// export interface User {
//     id: number;
//     username: string;
//     password: string;
//     created_at: Date;
// }

// export interface Message {
//     id: number;
//     user_id: number;
//     sender: string;
//     content: string;
//     sent_at: Date;
// }

// // Function to create a new user
// export const createUser = async (username: string, hashedPassword: string): Promise<User> => {
//     const result: QueryResult<User> = await pool.query(
//         'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
//         [username, hashedPassword]
//     );
//     return result.rows[0];
// };

// // Function to find a user by username
// export const findUserByUsername = async (username: string): Promise<User | null> => {
//     const result: QueryResult<User> = await pool.query(
//         'SELECT * FROM users WHERE username = $1',
//         [username]
//     );
//     return result.rows[0] || null;
// };

// // Function to insert a message into the database for a specific user
// export const insertMessage = async (user_id: number, sender: string, content: string): Promise<Message> => {
//     const result: QueryResult<Message> = await pool.query(
//         'INSERT INTO messages (user_id, sender, content) VALUES ($1, $2, $3) RETURNING *',
//         [user_id, sender, content]
//     );
//     return result.rows[0];
// };

// // Function to retrieve all messages for a specific user
// export const getAllMessages = async (user_id: number): Promise<Message[]> => {
//     const result: QueryResult<Message> = await pool.query(
//         'SELECT * FROM messages WHERE user_id = $1 ORDER BY sent_at ASC',
//         [user_id]
//     );
//     return result.rows;
// };
