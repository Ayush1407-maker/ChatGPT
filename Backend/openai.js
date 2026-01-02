import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 👈 use env variable
});

export async function sendMsgToOpenAI(message) {
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: message,
  });

  return response.output_text;
}



