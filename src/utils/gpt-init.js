import axios from "axios";

const { VITE_OPENAI_API_KEY } = import.meta.env;

export const useGPTApi = async (places, userAnswer) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a travel planner. Based on the input locations, generate a travel itinerary in valid JSON format, exactly as provided in the input format. Ensure there are no additional notes, explanations, or text beyond the JSON itself.",
          },
          {
            role: "user",
            content: `Here are the locations in JSON format: ${JSON.stringify(
              places
            )}.

Please provide the output in the following exact JSON format:
{
  "day1": [
    {
      "addr1": "",
      "addr2": "",
      "area_code": 31,
      "content_id": 2514050,
      "content_type_id": 25,
      "img1": "http://example.com/image.jpg",
      "img2": "http://example.com/image.jpg",
      "latitude": 38.0703704758,
      "longitude": 127.1286316956,
      "map_level": 6,
      "si_gun_gu_code": 21,
      "tel": "",
      "title": "Example Title"
    }
  ]
}
    I want ${userAnswer.period} day's plan.
    Also, the trip will be ${userAnswer.people} people included.

    You should add more days into the result, for example day2, day3, according to the period.
    
    
    `,
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

    const assistantMessage = response.data.choices[0].message.content.trim();

    console.log("message", assistantMessage);

    try {
      // Parsing the result to ensure the format is the same as the input
      const parsedResult = JSON.parse(assistantMessage);
      return parsedResult;
    } catch (parseError) {
      console.error("Error parsing GPT response:", parseError);
      console.error("Received response:", assistantMessage);
      throw new Error(
        "Failed to parse the GPT response. Please check the response format."
      );
    }
  } catch (error) {
    console.error("Error fetching data from OpenAI API:", error);
    throw error;
  }
};
