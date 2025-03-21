require('dotenv').config();
const { OpenAI } = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testOpenAI() {
  try {
    console.log('Testing OpenAI API connection...');
    
    // Test GPT completion
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Say hello and confirm the OpenAI API is working correctly." }
      ],
    });

    console.log('OpenAI API Response:');
    console.log(completion.choices[0].message.content);
    console.log('\nAPI connection test successful!');
    
  } catch (error) {
    console.error('Error testing OpenAI API:');
    console.error(error);
  }
}

// Run the test
testOpenAI(); 