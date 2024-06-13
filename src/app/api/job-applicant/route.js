const { NextResponse } = require("next/server");
const db = require("../../config/db");

async function GET() {
  try {
    const results = await db.query("SELECT * FROM job_applicant");

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Error executing GET request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

async function POST(request) {
  try {
    const { vacancy_id, user_id } = await request.json();

    const result = await db.query("INSERT INTO job_applicant SET ?", {
      vacancy_id,
      user_id,
    });

    return NextResponse.json({
      vacancy_id,
      user_id,
    });
  } catch (error) {
    console.error("Error executing POST request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

module.exports = { GET, POST };
