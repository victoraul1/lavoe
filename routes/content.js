const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Mock database for demo purposes
// In a real app, you would use a proper database
const contentDatabase = {
  pages: [
    { id: 1, title: 'Home', content: 'Welcome to our website!', lastUpdated: new Date() },
    { id: 2, title: 'About', content: 'We are a company dedicated to innovation.', lastUpdated: new Date() },
    { id: 3, title: 'Services', content: 'We offer a variety of services.', lastUpdated: new Date() }
  ],
  blogs: [
    { 
      id: 1, 
      title: 'My Vacation', 
      content: 'Last summer I went to London. It was amazing!', 
      author: 'John Doe',
      tags: ['travel', 'vacation', 'summer'],
      publishedDate: new Date('2024-06-15'),
      lastUpdated: new Date()
    },
    { 
      id: 2, 
      title: 'Tech Trends 2025', 
      content: 'AI is changing the world rapidly.', 
      author: 'Jane Smith',
      tags: ['tech', 'AI', 'trends'],
      publishedDate: new Date('2024-08-01'),
      lastUpdated: new Date()
    }
  ]
};

// Get all content
router.get('/', (req, res) => {
  res.json(contentDatabase);
});

// Get all pages
router.get('/pages', (req, res) => {
  res.json(contentDatabase.pages);
});

// Get a specific page
router.get('/pages/:id', (req, res) => {
  const page = contentDatabase.pages.find(p => p.id === parseInt(req.params.id));
  if (!page) {
    return res.status(404).json({ error: 'Page not found' });
  }
  res.json(page);
});

// Update a page
router.put('/pages/:id', async (req, res) => {
  const pageId = parseInt(req.params.id);
  const pageIndex = contentDatabase.pages.findIndex(p => p.id === pageId);
  
  if (pageIndex === -1) {
    return res.status(404).json({ error: 'Page not found' });
  }

  const { title, content } = req.body;
  
  // Optional: Use GPT to improve or check content
  if (content && req.query.enhance === 'true') {
    try {
      const enhancedContent = await enhanceContent(content);
      contentDatabase.pages[pageIndex].content = enhancedContent;
    } catch (error) {
      console.error('Error enhancing content:', error);
      return res.status(500).json({ error: 'Failed to enhance content' });
    }
  } else {
    // Update without enhancement
    if (title) contentDatabase.pages[pageIndex].title = title;
    if (content) contentDatabase.pages[pageIndex].content = content;
  }
  
  contentDatabase.pages[pageIndex].lastUpdated = new Date();
  
  res.json(contentDatabase.pages[pageIndex]);
});

// Get all blog posts
router.get('/blogs', (req, res) => {
  res.json(contentDatabase.blogs);
});

// Get a specific blog post
router.get('/blogs/:id', (req, res) => {
  const blog = contentDatabase.blogs.find(b => b.id === parseInt(req.params.id));
  if (!blog) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  res.json(blog);
});

// Update a blog post
router.put('/blogs/:id', async (req, res) => {
  const blogId = parseInt(req.params.id);
  const blogIndex = contentDatabase.blogs.findIndex(b => b.id === blogId);
  
  if (blogIndex === -1) {
    return res.status(404).json({ error: 'Blog post not found' });
  }

  const { title, content, author, tags } = req.body;
  
  // Optional: Use GPT to improve or check content
  if (content && req.query.enhance === 'true') {
    try {
      const enhancedContent = await enhanceContent(content);
      contentDatabase.blogs[blogIndex].content = enhancedContent;
    } catch (error) {
      console.error('Error enhancing content:', error);
      return res.status(500).json({ error: 'Failed to enhance content' });
    }
  } else {
    // Update without enhancement
    if (title) contentDatabase.blogs[blogIndex].title = title;
    if (content) contentDatabase.blogs[blogIndex].content = content;
    if (author) contentDatabase.blogs[blogIndex].author = author;
    if (tags) contentDatabase.blogs[blogIndex].tags = tags;
  }
  
  contentDatabase.blogs[blogIndex].lastUpdated = new Date();
  
  res.json(contentDatabase.blogs[blogIndex]);
});

// Create a new blog post
router.post('/blogs', async (req, res) => {
  const { title, content, author, tags } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  // Generate a new ID
  const newId = contentDatabase.blogs.length > 0 
    ? Math.max(...contentDatabase.blogs.map(b => b.id)) + 1 
    : 1;
  
  // Optional: Use GPT to enhance the content
  let finalContent = content;
  if (req.query.enhance === 'true') {
    try {
      finalContent = await enhanceContent(content);
    } catch (error) {
      console.error('Error enhancing content:', error);
    }
  }
  
  const newBlog = {
    id: newId,
    title,
    content: finalContent,
    author: author || 'Anonymous',
    tags: tags || [],
    publishedDate: new Date(),
    lastUpdated: new Date()
  };
  
  contentDatabase.blogs.push(newBlog);
  
  res.status(201).json(newBlog);
});

// Helper function to use OpenAI to enhance content
async function enhanceContent(content) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a professional content editor. Your task is to enhance the following content 
                    while preserving its original meaning. Improve grammar, clarity, and flow.`
        },
        { role: "user", content }
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error enhancing content with GPT:', error);
    throw new Error('Failed to enhance content');
  }
}

module.exports = { contentRouter: router }; 