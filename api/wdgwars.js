module.exports = async function handler(req, res) {
  const key = process.env.WDG_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const upstream = await fetch(
      'https://wdgwars.pl/api/users/curtthecoder/stats',
      { headers: { 'X-API-Key': key } }
    );
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: 'Upstream error' });
    }
    const data = await upstream.json();
    // Cache for 5 minutes on Vercel's edge
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    return res.status(200).json(data);
  } catch {
    return res.status(502).json({ error: 'Failed to reach WDGoWars' });
  }
}
