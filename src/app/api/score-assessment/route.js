const { NextResponse } = require("next/server");
const db = require("../../config/db");

async function GET(request) {
  try {
    const id_user = request.nextUrl.searchParams.get('id_user');
    if (!id_user) {
      return NextResponse.json({ message: 'id_user is required' }, { status: 400 });
    }

    const results = await db.query("SELECT id_user, learning_path, assessment_point FROM score WHERE id_user = ?", [id_user]);

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Error executing GET request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

async function POST(request) {
  try {
    const { id_user, learning_path, assessment_point, action } = await request.json();

    var result;
    if(action=="update"){
      result = await db.query(
        "UPDATE score SET assessment_point = ? WHERE id_user = ? AND learning_path = ?",
        [assessment_point, id_user, learning_path]
      );
    } else {
      result = await db.query("INSERT INTO score SET ?", {
        id_user, 
        learning_path, 
        assessment_point, 
      });
    }

    return NextResponse.json({
      id_user,
      learning_path,
      assessment_point,
      id: result.insertId, 
    });
  } catch (error) {
    console.error("Error executing POST request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

module.exports = { GET, POST };
