const { NextResponse } = require("next/server");
const db = require("../../config/db");

// GET function for fetching all job applicants
async function GET() {
  try {
    const results = await db.query("SELECT * FROM job_applicant");

    console.log(results); // Log results to console for debugging

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error executing GET request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST function for inserting a new job applicant entry
async function POST(request) {
  try {
    const { vacancy_id, user_id } = await request.json();

    console.log(vacancy_id, user_id); // Log received data

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
