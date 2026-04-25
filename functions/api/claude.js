export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();

    // Handle email sending
    if (body.type === "send_order_email") {
      const { order } = body;
      const emailBody = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:20px">
          <div style="background:#0d1f5c;padding:24px;border-radius:12px 12px 0 0;text-align:center">
            <h1 style="color:#f7931a;margin:0;font-size:28px">FrexSOM Market</h1>
            <p style="color:rgba(255,255,255,0.7);margin:8px 0 0">New Order Received!</p>
          </div>
          <div style="background:white;padding:28px;border-radius:0 0 12px 12px;box-shadow:0 4px 12px rgba(0,0,0,0.1)">
            <div style="background:#fff7ee;border:2px solid #f7931a;border-radius:10px;padding:16px;margin-bottom:20px">
              <h2 style="color:#f7931a;margin:0 0 4px;font-size:20px">🛒 Order #${order.id}</h2>
              <p style="color:#64748b;margin:0;font-size:13px">${new Date().toLocaleString()}</p>
            </div>
            <table style="width:100%;border-collapse:collapse">
              <tr style="background:#f4f6fb"><td style="padding:12px;font-weight:700;color:#0d1f5c;width:40%">👤 Customer</td><td style="padding:12px;color:#374151">${order.name}</td></tr>
              <tr><td style="padding:12px;font-weight:700;color:#0d1f5c">📞 Phone</td><td style="padding:12px;color:#374151"><a href="tel:${order.phone}" style="color:#f7931a">${order.phone}</a></td></tr>
              <tr style="background:#f4f6fb"><td style="padding:12px;font-weight:700;color:#0d1f5c">📍 City</td><td style="padding:12px;color:#374151">${order.city}</td></tr>
              <tr><td style="padding:12px;font-weight:700;color:#0d1f5c">🏠 Address</td><td style="padding:12px;color:#374151">${order.address}</td></tr>
              <tr style="background:#f4f6fb"><td style="padding:12px;font-weight:700;color:#0d1f5c">💳 Payment</td><td style="padding:12px;color:#374151">${order.payment}</td></tr>
              <tr><td style="padding:12px;font-weight:700;color:#0d1f5c">📦 Items</td><td style="padding:12px;color:#374151">${order.items}</td></tr>
              <tr style="background:#fff7ee"><td style="padding:12px;font-weight:800;color:#0d1f5c;font-size:16px">💰 Total</td><td style="padding:12px;font-weight:800;color:#f7931a;font-size:18px">$${order.total}</td></tr>
            </table>
            <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:14px;margin-top:20px;text-align:center">
              <p style="color:#166534;margin:0;font-weight:600">⚡ Action Required: Contact customer to confirm delivery</p>
            </div>
            <div style="text-align:center;margin-top:20px;padding-top:20px;border-top:1px solid #f0f2f8">
              <p style="color:#94a3b8;font-size:12px;margin:0">FrexSOM Market · frexsom.com · (+252) 611 013 604</p>
            </div>
          </div>
        </div>
      `;

      const recipients = ["info@frexsom.com", "frexsom@gmail.com"];

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "FrexSOM Orders <orders@frexsom.com>",
          to: recipients,
          subject: `🛒 New Order #${order.id} — ${order.name} — $${order.total}`,
          html: emailBody,
        }),
      });

      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    // Handle Claude AI requests
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}