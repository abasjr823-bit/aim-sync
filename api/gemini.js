export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const { gameName } = req.body;
    if (!gameName) {
        return res.status(400).json({ error: 'Game name required' });
    }
    try {
        const response = await fetch(
            https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY},
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: What is the mouse sensitivity multiplier (yaw value) for the game "${gameName}"? Reply with ONLY a single decimal number, nothing else.
                        }]
                    }]
                })
            }
        );
        const data = await response.json();
        const mult = parseFloat(data.candidates[0].content.parts[0].text.trim());
        if (isNaN(mult)) {
            return res.status(400).json({ error: 'Could not find multiplier' });
        }
        res.status(200).json({ mult });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
