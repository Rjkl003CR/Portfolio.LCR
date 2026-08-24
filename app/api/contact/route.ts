import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters." },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "ranathungarjklc.23@uom.lk",
      subject: `Portfolio Contact: ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0B1121; color: #e2e8f0; padding: 32px; border-radius: 12px;">
          <h2 style="color: #14B8A6; margin-bottom: 24px;">📩 New Portfolio Message</h2>
          <div style="background: rgba(20,184,166,0.08); border: 1px solid rgba(20,184,166,0.2); border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px 0;"><strong style="color: #14B8A6;">Name:</strong> ${name}</p>
            <p style="margin: 0 0 8px 0;"><strong style="color: #14B8A6;">Email:</strong> <a href="mailto:${email}" style="color: #2DD4BF;">${email}</a></p>
          </div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 20px;">
            <p style="color: #14B8A6; font-weight: 600; margin: 0 0 12px 0;">Message:</p>
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #64748b;">Sent from your portfolio contact form</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
