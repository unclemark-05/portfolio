import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Only attempt Supabase if env vars are configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const { getSupabase } = await import("@/lib/supabase");
      const supabase = getSupabase();

      const { error } = await supabase.from("contacts").insert([
        { name, email, subject, message },
      ]);

      if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json(
          { error: "Failed to save message" },
          { status: 500 }
        );
      }
    } else {
      // Log to console when Supabase is not configured
      console.log("Contact form submission (Supabase not configured):", {
        name,
        email,
        subject,
        message,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
