export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { produk, target, harga, masalah, benefit } = req.body;

    const prompt = `
Buat landing page HIGH CONVERT:

Produk: ${produk}
Target: ${target}
Harga: ${harga}
Masalah: ${masalah}
Benefit: ${benefit}

Struktur:
Hook, Problem, Solution, Benefit, Social Proof, Offer, CTA
Bahasa santai, persuasif
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();

    console.log("OPENAI RESPONSE:", data);

    const text =
      data.choices?.[0]?.message?.content ||
      "❌ Gagal generate. Cek API key atau limit.";

    res.status(200).json({ result: text });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}
