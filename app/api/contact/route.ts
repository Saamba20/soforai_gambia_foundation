import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    volunteer: z.boolean().optional(),
});

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate the request body
        const validatedData = contactSchema.parse(body);
        const { name, email, subject, message, volunteer } = validatedData;

        if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
            console.error("SMTP credentials missing in environment variables");
            return NextResponse.json(
                { message: "Server configuration error. Please try again later." },
                { status: 500 }
            );
        }

        // HTML Email Template
        const htmlTemplate = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Contact Form Message</h1>
          <p style="color: #94a3b8; margin: 8px 0 0 0;">SOFORAI GAMBIA FOUNDATION</p>
        </div>
        <div style="padding: 24px; background-color: #ffffff;">
          <div style="margin-bottom: 20px;">
            <p style="font-size: 14px; color: #64748b; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Full Name</p>
            <p style="font-size: 16px; color: #1e293b; margin: 0; font-weight: 500;">${name}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <p style="font-size: 14px; color: #64748b; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Email Address</p>
            <p style="font-size: 16px; color: #1e293b; margin: 0; font-weight: 500;">${email}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <p style="font-size: 14px; color: #64748b; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Subject</p>
            <p style="font-size: 16px; color: #1e293b; margin: 0; font-weight: 500;">${subject}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <p style="font-size: 14px; color: #64748b; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Volunteer Interest</p>
            <p style="font-size: 16px; color: ${volunteer ? '#10b981' : '#ef4444'}; margin: 0; font-weight: 600;">${volunteer ? 'YES' : 'NO'}</p>
          </div>
          <div style="margin-bottom: 24px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #0f172a;">
            <p style="font-size: 14px; color: #64748b; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Message</p>
            <p style="font-size: 16px; color: #1e293b; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="font-size: 12px; color: #94a3b8; margin: 0;">This email was sent from the contact form on your website.</p>
        </div>
      </div>
    `;

        // Send Mail
        await transporter.sendMail({
            from: `"${name}" <${process.env.SMTP_EMAIL}>`, // Gmail requires the "from" to be the authenticated user or an alias
            to: process.env.CONTACT_FORM_RECEIVER || process.env.SMTP_EMAIL,
            replyTo: email,
            subject: `[Contact Form] ${subject}`,
            html: htmlTemplate,
            text: `New Contact Form Message\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nVolunteer: ${volunteer ? 'Yes' : 'No'}\n\nMessage:\n${message}`,
        });

        return NextResponse.json(
            { message: "Thank you for your message. We'll get back to you soon!" },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Validation failed", errors: error.issues },
                { status: 400 }
            );
        }

        console.error("Nodemailer API Error:", error);
        return NextResponse.json(
            { message: "Something went wrong. Please check your SMTP configuration." },
            { status: 500 }
        );
    }
}
