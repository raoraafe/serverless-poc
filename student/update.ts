import db from '../dbConfig';
import * as Joi from 'joi';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

  const schema = Joi.object({
    id: Joi.number().positive().required(),
    name: Joi.string().required(),
  });

  const { error, value } = schema.validate(JSON.parse(event.body || ''));

  if (error) {

    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request body', error: error.details }),
    };
  }

  const { id, name } = value;

  try {

    await db.query('UPDATE student SET name = (?) WHERE id = (?)', [name, id]);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Student updated successfully',
        studentId: id,
      }),
    };

  } catch (error) {

    console.error('Error updating student:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
