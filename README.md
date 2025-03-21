# Lavoe - Voice-Powered Website Editor

Lavoe is an AI-powered voice assistant that allows users to update web content using natural language commands. Simply speak your changes, and our advanced processing will understand and apply them to your website.

## Features

- **Voice Recognition**: Update your website using just your voice
- **English-Only Processing**: All voice commands are processed in English
- **AI Content Processing**: Intelligent understanding of your intent
- **Real-time Updates**: See changes immediately on your website

## Technologies Used

- Node.js
- Express
- OpenAI API (Whisper for transcription, GPT for command processing)
- Flutter (for the companion app)

## Setup

1. Clone the repository:
```
git clone https://github.com/victoraul1/lavoe.git
```

2. Install dependencies:
```
cd lavoe
npm install
```

3. Create a `.env` file with your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
PORT=3000
```

4. Start the server:
```
node index.js
```

## API Endpoints

- `/ping`: Test connection
- `/process-voice`: Process voice commands
- `/execute-action`: Manually execute actions
- `/api/content`: Content manipulation API

## Usage

Send audio recordings to the `/process-voice` endpoint. The server will transcribe the audio, interpret the command, and return an appropriate action.

Example response:
```json
{
  "success": true,
  "transcription": "Update the welcome message to say hello to everyone",
  "response": "I'll update the welcome message to say hello to everyone",
  "action": "welcome update that says hello to everyone"
}
``` 