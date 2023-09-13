import * as serverlessMysql from 'serverless-mysql';
// we can look in to secret manager
const dbConfig = {
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
}

const db = serverlessMysql({ config: dbConfig });

// Function to check if the connection is established
async function checkConnection() {
    try {
        // Try to execute a test query
        const result = await db.query('SELECT 1');
        console.log('Connection is established:', result);
    } catch (error) {
        console.error('Connection error:', error);
    } finally {
        // Close the connection when done
        db.end();
    }
}
checkConnection();
export default db;
