import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatBody = {
  message: string;
  courseTitle: string;
  contextDocs: string[];
  history?: { role: "user" | "assistant"; text: string }[];
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  let body: ChatBody;
  try {
    body = (await req.json()) as ChatBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { message, courseTitle, contextDocs, history = [] } = body;

  if (!message?.trim()) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  if (!apiKey) {
    // No key configured yet — return a clear, honest message instead of failing silently.
    return NextResponse.json({
      reply:
        "The AI assistant isn't connected to a live model yet — add your free Gemini API key to .env.local as GEMINI_API_KEY and restart the server to enable real answers.",
      mocked: true,
    });
  }

  const systemPrompt = `You are Nexalearn's AI study assistant for the course "${courseTitle}".
Answer ONLY using the course material provided below. If the answer isn't in the material,
say you don't have that in the course documents yet and suggest asking the instructor.
Keep answers concise, friendly, and exam-relevant. When helpful, mention which document the
answer is based on.

Course material:
${contextDocs.length ? contextDocs.map((d, i) => `[Document ${i + 1}] ${d}`).join("\n\n") : "(No documents uploaded yet for this course.)"}`;

  const contents = [
    { role: "user", parts: [{ text: systemPrompt }] },
    { role: "model", parts: [{ text: `Understood — I'll answer only from ${courseTitle}'s course material.` }] },
    ...history.map((h) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini API error:", errText);
      return NextResponse.json(
        { error: "The AI assistant couldn't reach Gemini right now. Check your API key and try again." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const reply: string =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join("") ??
      "I wasn't able to generate a response for that — try rephrasing your question.";

    return NextResponse.json({ reply, mocked: false });
  } catch (err) {
    console.error("Gemini request failed:", err);
    return NextResponse.json(
      { error: "Something went wrong reaching the AI assistant." },
      { status: 500 }
    );
  }
}
