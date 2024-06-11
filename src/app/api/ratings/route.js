const { NextResponse } = require("next/server");
const db = require("../../config/db");

// GET function for fetching ratings based on respondent identifier
async function GET(request) {
  try {
    const id_user = request.nextUrl.searchParams.get('id_user');
    if (!id_user) {
      return NextResponse.json({ message: 'id_user is required' }, { status: 400 });
    }

    const results = await db.query("SELECT * FROM ratings WHERE respondent_identifier = ?", [id_user]);

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error executing GET request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

async function POST(request) {
  try {
    const { respondent_identifier, course_name, rating } = await request.json();

    const result = await db.query("INSERT INTO ratings SET ?", {
      respondent_identifier,
      course_name,
      rating,
    });

    return NextResponse.json({
      respondent_identifier,
      course_name,
      rating,
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error executing POST request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

module.exports = { GET, POST };
