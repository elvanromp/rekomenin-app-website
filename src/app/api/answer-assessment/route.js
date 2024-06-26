import { NextResponse } from 'next/server';
import db from '../../config/db';

export async function GET() {
  try {
    const [results, fields] = await db.query(
      'SELECT id_answer, id_assessment, point, text, learning_path FROM answers WHERE id_assessment IS NOT NULL'
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error executing query:', error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}