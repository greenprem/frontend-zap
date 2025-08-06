// utils/sendToDiscord.ts

export async function sendToDiscord(message: string, username?: string) {
  const response = await fetch('/api/sendDiscordWebhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: message, username }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send Discord webhook');
  }

  return await response.json();
}
