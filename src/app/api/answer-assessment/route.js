import { NextResponse } from 'next/server';
import db from '../../config/db';

export async function GET() {
  try {
    // Execute the query using await and async
    const [results, fields] = await db.query(
      'SELECT id_answer, id_assessment, point, text, learning_path FROM answers WHERE id_assessment IS NOT NULL'
    );


    // Return the results as JSON response
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error executing query:', error);

    // Return error message as JSON response with status 500
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}