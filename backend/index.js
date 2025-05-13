const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/generate-resume', async (req, res) => {
  const { name, skills, experience } = req.body;

  const prompt = `
You are a resume writer helping someone with life instability and informal work history. Build a resume based on:

Name: ${name}
Skills: ${skills}
Experience: ${experience}

Highlight reliability, initiative, and soft skills.
`;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const resume = completion.data.choices[0].message.content;
    res.json({ resume });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating resume');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
