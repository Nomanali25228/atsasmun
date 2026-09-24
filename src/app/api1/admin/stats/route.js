import { NextResponse } from "next/server";
import { collections } from "@/app/lib/db";
import { verifyAdmin, unauthorizedResponse } from "@/app/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  if (!verifyAdmin(request)) return unauthorizedResponse();

  try {
    const [istanbul, dubai, azerbaijan, usa, saudi, uk, blogs] =
      await Promise.all([
        collections.istanbul.getAll(),
        collections.dubai.getAll(),
        collections.azerbaijan.getAll(),
        collections.usa.getAll(),
        collections.saudi.getAll(),
        collections.uk.getAll(),
        collections.blogs.getAll(),
      ]);

    const totalRegistrations =
      istanbul.length +
      dubai.length +
      azerbaijan.length +
      usa.length +
      saudi.length +
      uk.length;

    // Get recent registrations (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const allRegistrations = [
      ...istanbul.map((r) => ({ ...r, destination: "Istanbul" })),
      ...dubai.map((r) => ({ ...r, destination: "Dubai" })),
      ...azerbaijan.map((r) => ({ ...r, destination: "Azerbaijan" })),
      ...usa.map((r) => ({ ...r, destination: "USA" })),
      ...saudi.map((r) => ({ ...r, destination: "Saudi" })),
      ...uk.map((r) => ({ ...r, destination: "UK" })),
    ];

    const recentRegistrations = allRegistrations
      .filter((r) => new Date(r.createdAt) >= sevenDaysAgo)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    const pendingAcceptanceRegistrations = allRegistrations
      .filter((r) => r.acceptanceLetterSent !== true)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 50);

    return NextResponse.json({
      success: true,
      stats: {
        totalRegistrations,
        totalBlogs: blogs.length,
        destinations: {
          istanbul: istanbul.length,
          dubai: dubai.length,
          azerbaijan: azerbaijan.length,
          usa: usa.length,
          saudi: saudi.length,
          uk: uk.length,
        },
        recentRegistrations,
        pendingAcceptanceRegistrations,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
