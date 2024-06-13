const { NextResponse } = require("next/server");
const db = require("../../config/db");

async function GET() {
  try {
    const results = await db.query("SELECT * FROM preferensi");

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Error executing GET request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

module.exports = { GET };