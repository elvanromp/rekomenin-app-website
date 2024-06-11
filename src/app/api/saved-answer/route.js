const { NextResponse } = require("next/server");
const db = require("../../config/db");

// GET function for fetching saved answers based on user ID
async function GET(request) {
  try {
    const id_user = request.nextUrl.searchParams.get('id_user');
    if (!id_user) {
      return NextResponse.json({ message: 'id_user is required' }, { status: 400 });
    }

    const results = await db.query("SELECT * FROM saved_answer WHERE id_user = ?", [id_user]);

    console.log(results); // Log results to console for debugging

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error executing GET request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST function for saving an answer
async function POST(request) {
  try {
    const { id_user, id_assessment, id_answer } = await request.json();

    console.log(id_user, id_assessment, id_answer); // Log received data

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
