const { NextResponse } = require("next/server");
const db = require("../../config/db");

// GET function for fetching courses
async function GET() {
  try {
    const results = await db.query("SELECT * FROM courses");

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error executing GET request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST function for adding a new course
async function POST(request) {
  try {
    const { name, description, technology, hours_to_study, rating, level, learning_path, total_modules, registered_students } = await request.json();

    console.log(name, description, technology, hours_to_study, rating, level, learning_path, total_modules, registered_students); // Log received data

    const result = await db.query("INSERT INTO courses SET ?", {
      name,
      description,
      technology,
      hours_to_study,
      rating,
      level,
      learning_path,
      total_modules,
      registered_students
    });

    return NextResponse.json({
      name,
      description,
      technology,
      hours_to_study,
      rating,
      level,
      learning_path,
      total_modules,
      registered_students,
      id: result.insertId
    });
  } catch (error) {
    console.error("Error executing POST request:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Export both functions
module.exports = { GET, POST };
