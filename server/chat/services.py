import os
import json
from groq import Groq
from dotenv import load_dotenv
import httpx

load_dotenv()

class GroqService:
    def __init__(self):
        api_key = os.getenv('GROQ_API_KEY')
        if not api_key:
            raise ValueError('GROQ_API_KEY not found in environment variables')
            
        self.client = Groq(
            api_key=api_key,
            http_client=httpx.Client()
        )
        self.model = "mixtral-8x7b-32768"

    def get_response(self, user_message):
        """Get a structured response from Groq API"""
        try:
            system_prompt = """
            You are a highly knowledgeable AI assistant specializing in venture capital, startups, and investments. Your primary role is to provide insightful, data-driven, and structured responses related to fundraising, market trends, investor analysis, startup valuations, and financial strategies.  

            ### Key Capabilities:
            - Analyze venture capital trends, funding rounds, and startup growth.
            - Provide structured insights on investment opportunities, market dynamics, and emerging technologies.
            - Offer guidance on pitching to VCs, structuring term sheets, and navigating investment strategies.
            - Summarize financial reports, valuation models, and investor sentiment.

            ### Response Format:
            - Always return responses in **JSON format** with relevant structured fields (e.g., `{"summary": "...", "key_insights": [...], "data": {...}}`).
            - Do **not** include any additional text, explanations, or formatting outside JSON.
            - If a question is unclear, return: `{"error": "Invalid query. Please provide more details."}`.

            ### Example Queries:
            - "What are the latest Series A funding rounds in AI startups?"
            - "Analyze Sequoia Capital’s recent investments."
            - "What are key valuation metrics for early-stage startups?"
            - "Compare funding trends in fintech vs. healthtech in 2024."

            Stay concise, data-focused, and structured in every response. 
        """

            chat_completion = self.client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": system_prompt
                    },
                    {
                        "role": "user",
                        "content": user_message
                    }
                ],
                model=self.model,
                temperature=0.7,
                max_tokens=2048,
            )

            response_text = chat_completion.choices[0].message.content
            
            # Parse JSON response
            try:
                data = json.loads(response_text)
                return {
                    'status': 'success',
                    'data': data
                }
            except json.JSONDecodeError:
                return {
                    'status': 'error',
                    'message': 'Failed to parse JSON response',
                    'raw_response': response_text
                }

        except Exception as e:
            return {
                'status': 'error',
                'message': str(e)
            }
