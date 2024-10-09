export default function handler(req, res) {
  if (req.method === 'POST') {
    const { ingredients } = req.body;
    console.log(ingredients)
    
    if (!ingredients || !Array.isArray(ingredients)) {
      return res.status(400).json({ error: 'Invalid ingredients data' });
    }

    const formattedString = ingredients.join(' ');
    
    res.status(200).json({ formattedString });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
