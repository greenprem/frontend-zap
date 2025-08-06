// api/sendDiscordWebhook.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { content, username } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Missing content in request body' });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return res.status(500).json({ error: 'Webhook URL not configured' });
  }

  try {
    const discordRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        username: username || 'React Bot',
      }),
    });

    if (!discordRes.ok) {
      const errorText = await discordRes.text();
      return res.status(discordRes.status).json({ error: errorText });
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
