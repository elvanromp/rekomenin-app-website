const { NextResponse } = require("next/server");
const db = require("../../config/db");

// GET function for fetching jobs
async function GET() {
  try {
    const results = await db.query("SELECT * FROM jobs");

    console.log(results); // Log results to console for debugging

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error executing GET request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST function for adding a new job
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

    console.log(
      position,
      sector,
      company,
      description,
      minimum_job_experience,
      talent_quota,
      job_type,
      location
    ); // Log received data

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
