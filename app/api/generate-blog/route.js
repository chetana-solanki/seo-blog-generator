// API route to generate blog using OpenAI's GPT-4o-mini model
// https://platform.openai.com/docs/models/gpt-4o-mini
import OpenAI from "openai";

export async function POST(request) {
  try {
    const { keyword, length } = await request.json(); // Get keyword and length from request body

    // Initialize OpenAI client with API key
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Create prompt for blog generation
    const prompt = `Write a detailed, SEO-optimized blog post about "${keyword}".
    Blog length: ${length} words.`;

    // Call OpenAI API to generate blog content
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using GPT-4o-mini model
      messages: [{ role: "user", content: prompt }],
    });

    const blogText = response.choices[0].message.content; // Extract generated text

    return Response.json({ blog: blogText }); // Return generated blog
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong!" }, { status: 500 });
  }
}
