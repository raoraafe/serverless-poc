import db from '../dbConfig';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    try {

        const results = await db.query('SELECT * FROM student');
        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                    message: 'List of All students',
                    results
                },
                null,
                2
            )
        }
        
    } catch (error) {

        console.error('Error executing query:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error!' }),
        };
    }
};