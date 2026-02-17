import { NextResponse } from "next/server";
import { getAllTodos, createTodo } from "database";
import { corsHeaders, handleOptions } from "../../../lib/cors";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET() {
  try {
    console.log("🔍 Attempting to fetch todos...");
    const todos = getAllTodos();
    console.log(`✅ Successfully fetched ${todos.length} todos`);
    return NextResponse.json({ todos }, { headers: corsHeaders });
  } catch (error) {
    console.error("❌ Error fetching todos:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        error: "Failed to fetch todos",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json(
        { error: "Title is required and must be a string" },
        { status: 400, headers: corsHeaders }
      );
    }

    const newTodo = createTodo(body.title);
    return NextResponse.json({ todo: newTodo }, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500, headers: corsHeaders }
    );
  }
}
