const { NextResponse } = require("next/server");
const db = require("../../config/db");

// GET function for fetching learning path based on user ID
async function GET(request) {
  try {
    const id_user = request.nextUrl.searchParams.get('id_user');
    if (!id_user) {
      return NextResponse.json({ message: 'id_user is required' }, { status: 400 });
    }

    const results = await db.query("SELECT learning_path FROM score WHERE id_user = ?", [id_user]);

    console.log(results); // Log results to console for debugging

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error executing GET request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST function for updating assessment points
async function POST(request) {
  try {
    const { id_user, learning_path, assessment_point } = await request.json();

    console.log(id_user, learning_path, assessment_point); // Log received data

    const result = await db.query(
      "UPDATE score SET assessment_point = ? WHERE id_user = ? AND learning_path = ?",
      [assessment_point, id_user, learning_path]
    );

    return NextResponse.json({
      id_user,
      learning_path,
      assessment_point,
      id: result.insertId, // Assuming you want to return the ID of the updated record
    });
  } catch (error) {
    console.error("Error executing POST request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

module.exports = { GET, POST };
