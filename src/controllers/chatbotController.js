const axios = require('axios');
const faqDatabase = require('../utils/faqDatabase');

const handleChatRequest = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ response: "No message provided." });
  }

  const lowerMessage = message.toLowerCase();

  // Step 1: Search local FAQs
  const matchedFaq = faqDatabase.find(faq =>
    faq.keywords.some(keyword => lowerMessage.includes(keyword))
  );

  if (matchedFaq) {
    return res.json({ response: matchedFaq.answer });
  }

  // Step 2: DeepSeek API fallback
  try {
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are an expert assistant for SMEs in Mauritius. Provide professional, clear, helpful answers." },
          { role: "user", content: message }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DeepSeek_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let botReply = response.data?.choices?.[0]?.message?.content || "";

    // Filtering DeepSeek response
    botReply = botReply
      .replace(/###/g, '')
      .replace(/---/g, '')
      .replace(/\n\s*\n/g, '\n')
      .replace(/•/g, '-')
      .replace(/\s{2,}/g, ' ')
      .trim();

    if (botReply.length > 800) {
      botReply = botReply.substring(0, 800) + '...';
    }

    if (!botReply) {
      botReply = "Sorry, I couldn't generate a proper answer. Please rephrase your question. 🤔";
    }

    res.json({ response: botReply });

  } catch (error) {
    console.error('DeepSeek API error:', error.response?.data || error.message);
    res.status(500).json({ response: "Sorry, I couldn't connect to the AI assistant. Please try again later. 😔" });
  }
};

module.exports = { handleChatRequest };
