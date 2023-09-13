import db from '../dbConfig';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    const { id } = JSON.parse(event.body || '');

    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'ID is required in the request body' }),
        };
    }

    try {

        await db.query('DELETE FROM student WHERE id = (?)', [id])
        
        return {
            statusCode: 201,
            body: JSON.stringify({
                message: 'Student deleted successfully',
                studentId: id,
            }),
        };
    } catch (error) {

        console.error('Error deleting student:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
}
