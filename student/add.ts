import db from '../dbConfig';
import * as Joi from 'joi';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    const schema = Joi.object({
        name: Joi.string().required(),
    });

    const { error, value } = schema.validate(JSON.parse(event.body || ''));

    if (error) {

        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid request body', error: error.details }),
        };
    }

    const { name } = value;

    try {

        const result: any = await db.query('INSERT INTO student (name) VALUES (?)', [name]);

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: 'Student added successfully',
                studentId: result.insertId,
            }),
        };
    } catch (error) {

        console.error('Error adding student:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};
