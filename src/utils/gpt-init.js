import axios from "axios";

const { VITE_OPENAI_API_KEY } = import.meta.env;

export const useGPTApi = async (places) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a travel planner. Generate a travel itinerary based on the following locations.",
          },
          {
            role: "user",
            content: `Here are the locations: ${JSON.stringify(places)}`,
          },
        ],
        max_tokens: 1500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${VITE_OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching data from OpenAI API:", error);
    throw error;
  }
};
