import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const insertMessage = async (userId, message, sender) => {
    try {
        const result = await pool.query(
            'INSERT INTO messages (user_id, sender, content) VALUES ($1, $2, $3) RETURNING *',
            [userId, sender, message]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error inserting message:', error);
        throw error;
    }
};

export const getConversationByUserId = async (userId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM messages WHERE user_id = $1 ORDER BY sent_at ASC',
            [userId]
        );
        return result.rows;
    } catch (error) {
        console.error('Error retrieving conversation:', error);
        throw error;
    }
};
