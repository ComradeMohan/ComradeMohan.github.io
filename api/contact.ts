// Simple Vercel-style serverless handler placeholder
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, email, phone, message } = req.body || {};
  if (!email || !message) return res.status(400).json({ error: 'Missing fields' });

  // TODO: integrate with email provider / serverless function
  console.log('Contact request', { name, email, phone, message });
  return res.status(200).json({ ok: true });
}
