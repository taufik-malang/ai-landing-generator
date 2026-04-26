export default async function handler(req, res) {
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

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt
      })
    });

    const data = await response.json();

    // 🔥 FIX DI SINI
    const text = data.output_text || "Gagal generate, coba lagi";

    res.status(200).json({
      result: text
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
