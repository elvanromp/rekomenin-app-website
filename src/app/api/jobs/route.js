const { NextResponse } = require("next/server");
const db = require("../../config/db");

async function GET() {
  try {
    const results = await db.query("SELECT * FROM jobs");

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error executing GET request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

async function POST(request) {
  try {
    const {
      position,
      sector,
      company,
      description,
      minimum_job_experience,
      talent_quota,
      job_type,
      location,
    } = await request.json();

    const result = await db.query("INSERT INTO jobs SET ?", {
      position,
      sector,
      company,
      description,
      minimum_job_experience,
      talent_quota,
      job_type,
      location,
    });

    return NextResponse.json({
      position,
      sector,
      company,
      description,
      minimum_job_experience,
      talent_quota,
      job_type,
      location,
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error executing POST request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

module.exports = { GET, POST };
