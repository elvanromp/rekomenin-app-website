const { NextResponse } = require("next/server");
const db = require("../../config/db");

// GET function for fetching learning path and user ID based on user ID
async function GET(request) {
  try {
    const id_user = request.nextUrl.searchParams.get('id_user');
    if (!id_user) {
      return NextResponse.json({ message: 'id_user is required' }, { status: 400 });
    }

    const results = await db.query("SELECT learning_path, id_user FROM score WHERE id_user = ?", [id_user]);

    console.log(results); // Log results to console for debugging

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error executing GET request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST function for inserting a new score entry
async function POST(request) {
  try {
    const { id_user, learning_path, preferensi_point } = await request.json();

    console.log(id_user, learning_path, preferensi_point); // Log received data

    const result = await db.query("INSERT INTO score SET ?", {
      id_user,
      learning_path,
      preferensi_point,
    });

    return NextResponse.json({
      id_user,
      learning_path,
      preferensi_point,
      id: result.insertId, // Assuming you want to return the ID of the inserted record
    });
  } catch (error) {
    console.error("Error executing POST request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

module.exports = { GET, POST };
