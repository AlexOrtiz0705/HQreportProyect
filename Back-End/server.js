const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json({ limit: "25mb" }));

app.post("/validate-image", async (req, res) => {
  try {
    const { tipoEsperado, imagenBase64 } = req.body;

    if (!tipoEsperado || !imagenBase64) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const payload = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Validar fotografía técnica.
Responde SOLO este JSON:
{
  "coincide": true/false,
  "confianza": 0-100,
  "motivo": "",
  "descripcionDetectada": ""
}
          `,
        },
        {
          role: "user",
          content: [
            { type: "text", text: `Validar si corresponde a: ${tipoEsperado}` },
            {
              type: "input_image",
              image_url: `data:image/jpeg;base64,${imagenBase64}`,
            },
          ],
        },
      ],
    };

    const ai = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const raw = await ai.json();

    let content = raw.choices?.[0]?.message?.content || "{}";

    let first = content.indexOf("{");
    let last = content.lastIndexOf("}");
    if (first !== -1 && last !== -1) {
      content = content.substring(first, last + 1);
    }

    res.json(JSON.parse(content));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error interno", detalle: e.message });
  }
});

app.get("/", (req, res) => res.send("Backend funcionando ✔"));

app.listen(4000, () => console.log("Backend corriendo en http://localhost:4000"));
