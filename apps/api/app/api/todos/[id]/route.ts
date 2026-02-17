  import { NextResponse } from "next/server";
  import { deleteTodo, updateTodo } from "database";
  import { corsHeaders, handleOptions } from "../../../../lib/cors";

  export async function OPTIONS() {
    return handleOptions();
  }

  export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const todoId = parseInt(params.id, 10);

      if (isNaN(todoId)) {
        return NextResponse.json(
          { error: "Invalid todo ID" },
          { status: 400, headers: corsHeaders }
        );
      }

      deleteTodo(todoId);  // ← THIS is the database call

      return NextResponse.json(
        { message: "Todo deleted successfully" },
        { status: 200, headers: corsHeaders }
      );
    } catch (error) {
      console.error("Error deleting todo:", error);
      return NextResponse.json(
        { error: "Failed to delete todo" },
        { status: 500, headers: corsHeaders }
      );
    }
  }

  export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const todoId = parseInt(params.id, 10);

      if (isNaN(todoId)) {
        return NextResponse.json(
          { error: "Invalid todo ID" },
          { status: 400, headers: corsHeaders }
        );
      }

      const body = await request.json();

      if (typeof body.completed !== "boolean") {
        return NextResponse.json(
          { error: "completed must be a boolean" },
          { status: 400, headers: corsHeaders }
        );
      }

      updateTodo(todoId, body.completed);  // ← THIS is the database call

      return NextResponse.json(
        { message: "Todo updated successfully" },
        { status: 200, headers: corsHeaders }
      );
    } catch (error) {
      console.error("Error updating todo:", error);
      return NextResponse.json(
        { error: "Failed to update todo" },
        { status: 500, headers: corsHeaders }
      );
    }
  }