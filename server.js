const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/summarize', async (req, res) => {
  const content = req.body.content;
  console.log(content, 'content');
  if (!content || typeof content !== 'string') {
    res.status(400).json({ error: 'Invalid content' });
    return;
  }
  try {
    const summary = await callChatGPTAPI(content);
    res.json({ summary });
  } catch(error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const sysMsg = {
  role: 'system',
  content: '你是一个有好且出色的人工智能模型。请尽可能帮助用户，恰当地回复用户提出的问题。'
};

async function callChatGPTAPI(content) {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        sysMsg,
        {
          role: 'user',
          content: `请帮助我总结下面包裹在'''内的这篇文章的主要内容
          '''${content}'''
          `
        }
      ],
      max_tokens: 4000,
      temperature: 1,
      stream: true,
    }, {
      headers: {
        'Authorization': `Bearer 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`
      }
    });

    console.log(response, 11111);
    console.log(response.data, 'response');

    if (response.status === 200 && response.data && response.data.choices && response.data.choices.length > 0) {
      console.log(response.data.choices[0].message, 'msg');
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error('No summary generated');
    }
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    throw error;
  }
}
