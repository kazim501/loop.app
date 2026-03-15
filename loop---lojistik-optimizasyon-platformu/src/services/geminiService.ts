import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function optimizeRoute(orders: string[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Aşağıdaki teslimat adresleri için en verimli rotayı belirle ve kısa bir açıklama yap: ${orders.join(", ")}`,
      config: {
        systemInstruction: "Sen bir lojistik uzmanısın. Rotaları optimize ederek kuryelerin zaman kazanmasını sağlarsın.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Route optimization error:", error);
    return "Rota optimizasyonu şu an yapılamıyor.";
  }
}
