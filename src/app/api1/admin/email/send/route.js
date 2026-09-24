import { NextResponse } from "next/server";
import { verifyAdmin, unauthorizedResponse } from "@/app/lib/auth";
import { sendManualEmail } from "@/app/lib/emailTemplates";

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request) {
  if (!verifyAdmin(request)) return unauthorizedResponse();

  try {
    const body = await request.json();
    const { templateType = 'acceptance', registration = {}, targetCollection } = body;

    if (!registration.Email && !registration.email) {
      return NextResponse.json(
        { success: false, message: "Recipient email is required" },
        { status: 400 }
      );
    }

    const result = await sendManualEmail({
      templateType,
      reg: registration,
      targetCollection
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error sending manual email:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
