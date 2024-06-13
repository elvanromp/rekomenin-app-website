const { NextResponse } = require("next/server");
const db = require("../../config/db");

async function GET(request) {
  try {
    const id_user = request.nextUrl.searchParams.get('id_user');
    if (!id_user) {
      return NextResponse.json({ message: 'id_user is required' }, { status: 400 });
    }

    const results = await db.query("SELECT * FROM saved_answer WHERE id_user = ?", [id_user]);

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Error executing GET request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

async function POST(request) {
  try {
    const { id_user, id_assessment, id_answer } = await request.json();

    const result = await db.query("INSERT INTO saved_answer SET ?", {
      id_user,
      id_assessment,
      id_answer,
    });

    return NextResponse.json({
      id_user,
      id_assessment,
      id_answer,
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error executing POST request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

module.exports = { GET, POST };
