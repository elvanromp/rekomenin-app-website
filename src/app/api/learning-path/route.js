const { NextResponse } = require("next/server");
const db = require("../../config/db");

async function GET() {
  try {
    const results = await db.query("SELECT * FROM learning_path");

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Error executing GET request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

async function POST(request) {
  try {
    const { learning_path_name } = await request.json();

    const result = await db.query("INSERT INTO learning_path SET ?", {
      learning_path_name,
    });

    return NextResponse.json({
      learning_path_name,
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error executing POST request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

module.exports = { GET, POST };