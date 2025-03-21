# Lavoe - Voice-Powered Website Editor

Lavoe is an AI-powered voice assistant that enables you to update web content using natural language commands. This project consists of multiple components working together to provide a seamless voice control experience for website editing.

## Project Components

This repository is the main project container with links to the following components:

1. **Backend Server**: [lavoe-backend](https://github.com/victoraul1/lavoe-backend)
   - Node.js server that processes voice commands and updates web content
   - Includes natural language processing capabilities

2. **Flutter Web App**: [lavoe-flutter](https://github.com/victoraul1/lavoe-flutter)
   - Cross-platform application for recording and sending voice commands
   - Communicates with the backend server to process commands and receive responses

## Features

- **Voice Command Processing**: Use natural language to update website content
- **Web Content Management**: Modify welcome messages, about sections, services, and contact information
- **Real-time Updates**: Changes are applied immediately to the website
- **English Language Support**: All commands and responses are in English

## Getting Started

1. Clone the backend server repository:
   ```
   git clone https://github.com/victoraul1/lavoe-backend.git
   ```

2. Clone the Flutter web app repository:
   ```
   git clone https://github.com/victoraul1/lavoe-flutter.git
   ```

3. Follow the setup instructions in each repository's README.md file to get the components running.

## System Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Flutter App    │────▶│  Backend Server │────▶│   Web Content   │
│  (Voice Input)  │     │  (Processing)   │     │    (Output)     │
│                 │◀────│                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Example Commands

- "Update the welcome message to say hello to everyone"
- "Change the about section to mention our expertise in AI development"
- "Add a new service called voice recognition"
- "Update the contact email to contact@example.com"

## License

This project is proprietary and confidential. Unauthorized copying, transfer, or reproduction of the contents is strictly prohibited.

## Contact

For support or inquiries, please contact [your-email@example.com]. 