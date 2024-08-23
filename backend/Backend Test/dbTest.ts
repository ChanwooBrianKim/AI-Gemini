// import { Pool } from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
// });

// export const insertMessage = async (sender, content) => {
//     try {
//         const result = await pool.query(
//             'INSERT INTO messages (sender, content) VALUES ($1, $2) RETURNING *',
//             [sender, content]
//         );
//         return result.rows[0];
//     } catch (error) {
//         console.error('Error inserting message:', error);
//         throw error;
//     }
// };

// export const getAllMessages = async () => {
//     try {
//         const result = await pool.query('SELECT * FROM messages ORDER BY sent_at ASC');
//         return result.rows;
//     } catch (error) {
//         console.error('Error retrieving messages:', error);
//         throw error;
//     }
// };
