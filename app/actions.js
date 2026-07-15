"use server";

export async function sendContactRequest(formData) {
  const name = (formData.get("name") || "").toString().trim();
  const unternehmen = (formData.get("unternehmen") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const telefon = (formData.get("telefon") || "").toString().trim();
  const branche = (formData.get("branche") || "").toString().trim();
  const nachricht = (formData.get("nachricht") || "").toString().trim();

  if (!name || !email || !nachricht) {
    return {
      success: false,
      message: "Bitte füllen Sie alle Pflichtfelder aus.",
    };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return {
      success: false,
      message: "Der Versand ist derzeit nicht möglich. Bitte versuchen Sie es später erneut.",
    };
  }

  const lines = [
    "🔔 Neue Anfrage von webwerkfranken" + ".de",
    "",
    `👤 Name: ${name}`,
  ];
  if (unternehmen) lines.push(`🏢 Unternehmen: ${unternehmen}`);
  lines.push(`📧 E-Mail: ${email}`);
  if (telefon) lines.push(`📞 Telefon: ${telefon}`);
  if (branche) lines.push(`🏷 Branche: ${branche}`);
  lines.push("", "💬 Nachricht:", nachricht);

  try {
    const url = "https:" + "//api.telegram.org/bot" + token + "/sendMessage";
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n").slice(0, 4000),
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Telegram API error");
    }
    return {
      success: true,
      message: "Vielen Dank! Ihre Nachricht wurde erfolgreich versendet.",
    };
  } catch (e) {
    return {
      success: false,
      message: "Der Versand ist fehlgeschlagen. Bitte versuchen Sie es später erneut.",
    };
  }
}