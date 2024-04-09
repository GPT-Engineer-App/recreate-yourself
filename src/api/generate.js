import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { inputText } = req.body;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: inputText,
    max_tokens: 2048,
  });

  res.status(200).json({ output: completion.data.choices[0].text });
}