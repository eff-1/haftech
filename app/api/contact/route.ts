import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please provide a valid email address"),
  projectType: z.string().optional(),
  message: z.string().min(10, "Please provide at least 10 characters describing your project").max(3000),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  // Honeypot field: must be empty
  website_hp: z.string().optional(),
  turnstileToken: z.string().optional(),
});

// Simple in-memory rate limiter per IP: max 5 requests per 10 minutes
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + 10 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 5) {
    return true;
  }
  entry.count++;
  return false;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes before submitting again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = ContactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form input", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check honeypot: silent success to bot without sending email
    if (data.website_hp && data.website_hp.length > 0) {
      console.warn("[Contact Bot Trapped]", { ip });
      return NextResponse.json({ success: true });
    }

    // Verify Cloudflare Turnstile if secret key is configured
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && data.turnstileToken) {
      try {
        const verifyRes = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              secret: turnstileSecret,
              response: data.turnstileToken,
              remoteip: ip,
            }),
          }
        );
        const verifyJson = await verifyRes.json();
        if (!verifyJson.success) {
          return NextResponse.json(
            { error: "Bot verification failed. Please try again." },
            { status: 400 }
          );
        }
      } catch (err) {
        console.error("[Turnstile Verification Error]", err);
      }
    }

    const recipient = process.env.CONTACT_TO_EMAIL || "haftechhq@gmail.com";
    const sender = process.env.CONTACT_FROM_EMAIL || "no-reply@haftech.site";
    const apiKey = process.env.EMAIL_API_KEY;

    if (apiKey) {
      // In production with Resend API configured
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: sender,
            to: recipient,
            reply_to: data.email,
            subject: `[HafTech Enquiry] from ${data.name}`,
            text: `
Name: ${data.name}
Email: ${data.email}
Project Type: ${data.projectType ?? "Unspecified"}
Budget: ${data.budget ?? "Unspecified"}
Timeline: ${data.timeline ?? "Unspecified"}

Message:
${data.message}
            `.trim(),
          }),
        });

        if (!resendRes.ok) {
          const errText = await resendRes.text();
          console.error("[Resend Error]", errText);
        }
      } catch (err) {
        console.error("[Email Dispatch Exception]", err);
      }
    } else {
      // Development or unconfigured mail provider: log submission cleanly
      console.log("[Contact Submission Received]", {
        to: recipient,
        sender: data.email,
        name: data.name,
        type: data.projectType,
        messagePreview: data.message.slice(0, 80),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out. We will review your requirements and respond shortly.",
    });
  } catch (error) {
    console.error("[Contact Route Exception]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your message." },
      { status: 500 }
    );
  }
}
