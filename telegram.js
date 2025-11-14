import axios from "axios";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(200).send("Telegram Bot Running...");
    }

    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_TARGET_CHAT;

    if (!TOKEN || !CHAT_ID) {
      console.log("❌ Missing environment variables");
      return res.status(500).json({ error: "Missing ENV" });
    }

    const body = req.body;
    console.log("📨 Incoming Telegram Update:", JSON.stringify(body, null, 2));

    const userText =
      body?.message?.text ||
      body?.message?.caption ||
      "No message text received";

    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: `📩 رسالة جديدة من المستخدم:\n\n${userText}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.log("❌ Telegram Handler Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
