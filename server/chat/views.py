import json
import traceback
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ChatMessage
from .serializers import ChatMessageSerializer
from .services import GroqService

class ChatMessageViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
    groq_service = GroqService()
    
    @action(detail=False, methods=['get'])
    def get_history(self, request):
        """Get conversation history"""
        try:
            # Get the latest 50 messages
            messages = ChatMessage.objects.all()[:50]
            serializer = self.get_serializer(messages, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {
                    'status': 'error',
                    'message': str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'])
    def send_message(self, request):
        try:
            # Get and validate user message
            user_message = request.data.get('message', '')
            if not user_message:
                return Response(
                    {
                        'error': 'Message is required',
                        'type': 'error',
                        'content': 'Please provide a message.'
                    }, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Get structured response from Groq
            print("\n=== Processing User Message ===\n", user_message)
            
            try:
                response = self.groq_service.get_response(user_message)
                print("\n=== Groq Service Response ===\n", json.dumps(response, indent=2))
            except Exception as e:
                print("\n=== Error in Groq Service ===\n")
                print(traceback.format_exc())
                return Response(
                    {
                        'error': 'Failed to get response from AI service',
                        'type': 'error',
                        'content': 'Sorry, I encountered an error while processing your request. Please try again.',
                        'details': str(e)
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            # Validate response structure
            if not isinstance(response, dict):
                return Response(
                    {
                        'status': 'error',
                        'message': 'Invalid response structure from AI service'
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            # Save the chat message to database
            try:
                # Convert response to string for storage
                bot_response = json.dumps(response)
                ChatMessage.objects.create(
                    user_message=user_message,
                    bot_response=bot_response
                )
            except Exception as e:
                print(f"Error saving chat message: {e}")
                print(traceback.format_exc())
                # Continue even if saving fails
            
            # Create success response
            return Response(response, status=status.HTTP_200_OK)








        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

