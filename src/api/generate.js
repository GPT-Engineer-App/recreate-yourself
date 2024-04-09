import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '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',
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
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'An error occurred while generating the response.' });
}
}