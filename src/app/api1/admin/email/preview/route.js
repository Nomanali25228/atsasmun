import { NextResponse } from "next/server";
import { verifyAdmin, unauthorizedResponse } from "@/app/lib/auth";
import { generateEmailContent } from "@/app/lib/emailTemplates";

export const dynamic = 'force-dynamic';

export async function POST(request) {
  if (!verifyAdmin(request)) return unauthorizedResponse();

  try {
    const body = await request.json();
    const { templateType = 'acceptance', registration = {} } = body;

    const result = generateEmailContent(templateType, registration);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Error generating preview:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to generate preview" },
      { status: 500 }
    );
  }
}
