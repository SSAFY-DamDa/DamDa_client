import axios from "axios";

const { VITE_OPENAI_API_KEY } = import.meta.env;

// 재시도 설정
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1초

// 지연 함수
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const useGPTApi = async (places, userAnswer, retryCount = 0) => {
  try {
    32;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a travel planner. You must respond with ONLY valid JSON. Do not include any additional text or explanations. 

            Important planning rules:
            1. For each day, locations must be within 30 minutes of travel time from each other by public transportation
            2. Plan the route efficiently by considering the geographical proximity of places
            3. Each day must follow this exact sequence:
              - Restaurant (morning) - content_type_id: 39
              - Activity spot (from user's content_type_id)
              - Activity spot (from user's content_type_id)
              - Restaurant (evening) - content_type_id: 39
              - Accommodation - content_type_id: 32 (EXCEPT for the last day)
            4. Do not repeat any locations across days EXCEPT for accommodations
            5. You must include content_id for each place from the provided places data
            
            Prioritize locations that are close to each other to minimize travel time.`,
          },
          {
            role: "user",
            content: `Create a ${userAnswer.period} day travel plan for ${
              userAnswer.people
            } people using these locations: ${JSON.stringify(places)}
            For activity spots, you must use content_type_id: ${
              userAnswer.content_type_id
            }

            Requirements:
            - All selected places for each day should be within 30 minutes travel distance from each other
            - Consider the geographical location to minimize travel time
            - Ensure logical flow of movement between locations
            - Do not repeat any locations across days (accommodation can be repeated)
            - Last day should NOT include accommodation
            - Must include content_id for each place from the provided data

            Response must follow this exact JSON structure:
            {
              "day1": [
                {
                  "content_id": "MUST_INCLUDE_FROM_PROVIDED_DATA",
                  "content_type_id": 39,
                  "title": "Morning Restaurant",
                  ... other fields ...
                },
                {
                  "content_id": "MUST_INCLUDE_FROM_PROVIDED_DATA",
                  "content_type_id": ${userAnswer.content_type_id},
                  "title": "Activity 1",
                  ... other fields ...
                },
                {
                  "content_id": "MUST_INCLUDE_FROM_PROVIDED_DATA",
                  "content_type_id": ${userAnswer.content_type_id},
                  "title": "Activity 2",
                  ... other fields ...
                },
                {
                  "content_id": "MUST_INCLUDE_FROM_PROVIDED_DATA",
                  "content_type_id": 39,
                  "title": "Evening Restaurant",
                  ... other fields ...
                },
                {
                  "content_id": "MUST_INCLUDE_FROM_PROVIDED_DATA",
                  "content_type_id": 32,
                  "title": "Accommodation",
                  ... other fields ...
                }
              ],
              "day${userAnswer.period}": [
                {
                  "content_id": "MUST_INCLUDE_FROM_PROVIDED_DATA",
                  "content_type_id": 39,
                  "title": "Morning Restaurant",
                  ... other fields ...
                },
                {
                  "content_id": "MUST_INCLUDE_FROM_PROVIDED_DATA",
                  "content_type_id": ${userAnswer.content_type_id},
                  "title": "Activity 1",
                  ... other fields ...
                },
                {
                  "content_id": "MUST_INCLUDE_FROM_PROVIDED_DATA",
                  "content_type_id": ${userAnswer.content_type_id},
                  "title": "Activity 2",
                  ... other fields ...
                },
                {
                  "content_id": "MUST_INCLUDE_FROM_PROVIDED_DATA",
                  "content_type_id": 39,
                  "title": "Evening Restaurant",
                  ... other fields ...
                }
              ]
            }`,
          },
        ],
        temperature: 0.5,
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
      let cleanedResponse = assistantMessage;
      cleanedResponse = cleanedResponse.replace(/```json\n?|\n?```/g, "");

      const parsedResult = JSON.parse(cleanedResponse);

      if (!parsedResult || typeof parsedResult !== "object") {
        throw new Error("Invalid response structure");
      }

      return parsedResult;
    } catch (parseError) {
      console.error("Error parsing GPT response:", parseError);
      console.error("Received response:", assistantMessage);

      if (retryCount < MAX_RETRIES) {
        console.log(
          `JSON 파싱 실패, 재시도 중... (${retryCount + 1}/${MAX_RETRIES})`
        );
        await delay(RETRY_DELAY * (retryCount + 1));
        return useGPTApi(places, userAnswer, retryCount + 1);
      }

      throw new Error(
        "여행 일정을 생성하는 중 오류가 발생했습니다. 다시 시도해 주세요."
      );
    }
  } catch (error) {
    console.error("Error fetching data from OpenAI API:", error);

    if (error.response?.status === 429 && retryCount < MAX_RETRIES) {
      console.log(`API 요청 재시도 중... (${retryCount + 1}/${MAX_RETRIES})`);
      await delay(RETRY_DELAY * (retryCount + 1));
      return useGPTApi(places, userAnswer, retryCount + 1);
    }

    throw new Error(
      "API 요청 횟수가 초과되었습니다. 잠시 후 다시 시도해 주세요."
    );
  }
};
