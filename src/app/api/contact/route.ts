export const runtime = "nodejs";

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  detail: string;
};

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "kanokorn.mks@gmail.com";
const EMAIL_SUBJECT = "ลูกค้าติดต่อบริการ BOI";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "KMS BOI <onboarding@resend.dev>";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;

    if (!payload.firstName || !payload.lastName || !payload.email || !payload.detail) {
      return Response.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { ok: false, error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        replyTo: payload.email,
        subject: EMAIL_SUBJECT,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>ข้อความติดต่อจากเว็บไซต์</h2>
            <p><strong>ชื่อ:</strong> ${payload.firstName} ${payload.lastName}</p>
            <p><strong>อีเมล:</strong> ${payload.email}</p>
            <p><strong>รายละเอียด:</strong></p>
            <p>${payload.detail.replace(/\n/g, "<br />")}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return Response.json({ ok: false, error }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { ok: false, error: "Unexpected error" },
      { status: 500 }
    );
  }
}
