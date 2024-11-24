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
              "You are a travel planner. You must respond with ONLY valid JSON. Do not include any additional text or explanations. The response must be a properly formatted JSON object containing travel itinerary details.",
          },
          {
            role: "user",
            content: `Create a ${userAnswer.period} day travel plan for ${
              userAnswer.people
            } people using these locations: ${JSON.stringify(places)}

Response must follow this exact JSON structure:
{
  "day1": [
    {
      "addr1": "",
      "addr2": "",
      "area_code": 31,
      "content_id": 2514050,
      "content_type_id": 25,
      "img1": "",
      "img2": "",
      "latitude": 38.0703704758,
      "longitude": 127.1286316956,
      "map_level": 6,
      "si_gun_gu_code": 21,
      "tel": "",
      "title": ""
    }
  ],
  "day2": [...],
  ...
}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${VITE_OPENAI_API_KEY}`,
        },
      }
    );

    const assistantMessage = response.data.choices[0].message.content.trim();

    try {
      // 응답 전처리 추가
      let cleanedResponse = assistantMessage;
      // 응답에서 불필요한 백틱이나 'json' 텍스트가 있다면 제거
      cleanedResponse = cleanedResponse.replace(/```json\n?|\n?```/g, "");

      // JSON 파싱 시도
      const parsedResult = JSON.parse(cleanedResponse);

      // 기본 구조 검증
      if (!parsedResult || typeof parsedResult !== "object") {
        throw new Error("Invalid response structure");
      }

      return parsedResult;
    } catch (parseError) {
      console.error("Error parsing GPT response:", parseError);
      console.error("Received response:", assistantMessage);
      throw new Error(
        "여행 일정을 생성하는 중 오류가 발생했습니다. 다시 시도해 주세요."
      );
    }
  } catch (error) {
    console.error("Error fetching data from OpenAI API:", error);
    throw new Error(
      "API 요청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
    );
  }
};
