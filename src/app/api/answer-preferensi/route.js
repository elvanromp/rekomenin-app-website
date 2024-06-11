import { NextResponse } from 'next/server';
import db from '../../config/db';

export async function GET() {
  try {
    const [results, fields] = await db.query(
      'SELECT id_answer, id_preferensi, point, learning_path, text FROM answers WHERE id_preferensi IS NOT NULL'
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error executing query:', error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
