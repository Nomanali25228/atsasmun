import { NextResponse } from "next/server";
import { checkExistingRegistration } from "@/app/lib/db";

export async function POST(request) {
  try {
    const { email, phone, destination } = await request.json();

    const result = await checkExistingRegistration(email, phone, destination);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error checking duplicate registration:", error);
    return NextResponse.json(
      { exists: false, error: error.message || "Failed to check registration" },
      { status: 500 }
    );
  }
}
