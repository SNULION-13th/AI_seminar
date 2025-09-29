require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client } = require('@notionhq/client');
const { google } = require('googleapis');

const app = express();
const port = process.env.PORT || 3001;

// Notion Client
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Google OAuth2 Client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Set up CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173' // Assuming frontend runs on 5173
}));
app.use(express.json());

// --- Gmail OAuth Endpoints ---
app.get('/auth/google', (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/gmail.readonly'
  ];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true
  });
  res.redirect(authorizationUrl);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    // Redirect back to frontend with access token
    res.redirect(`http://localhost:5173?accessToken=${tokens.access_token}`);
  } catch (error) {
    console.error('Error during Google OAuth callback:', error);
    res.status(500).send('Authentication failed');
  }
});

// --- Notion API Endpoint ---
app.post('/api/notion/create-page', async (req, res) => {
  try {
    const { parent, properties, content } = req.body;

    const response = await notion.pages.create({
      parent: parent,
      properties: properties,
      children: content ? [{
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{ type: 'text', text: { content: content } }],
        },
      }] : [],
    });
    res.status(200).json(response);
  } catch (error) {
    console.error('Error creating Notion page:', error);
    res.status(500).json({ message: 'Failed to create Notion page', error: error.message });
  }
});

app.post('/api/notion/get-page-content', async (req, res) => {
  try {
    const { pageId } = req.body;
    if (!pageId) {
      return res.status(400).json({ message: 'Page ID is required' });
    }

    // Fetch page properties (including title)
    const page = await notion.pages.retrieve({ page_id: pageId });

    // Fetch page blocks (content)
    const blocks = await notion.blocks.children.list({ block_id: pageId });

    let snippet = '';
    for (const block of blocks.results) {
      if (block.type === 'paragraph' && block.paragraph.rich_text.length > 0) {
        snippet += block.paragraph.rich_text[0].plain_text + ' ';
      }
      // Limit snippet length
      if (snippet.length > 200) {
        snippet = snippet.substring(0, 200) + '...';
        break;
      }
    }

    res.status(200).json({
      title: page.properties.Name?.title?.[0]?.plain_text || 'Untitled', // Assuming 'Name' is the title property
      snippet: snippet.trim()
    });

  } catch (error) {
    console.error('Error fetching Notion page content:', error);
    res.status(500).json({ message: 'Failed to fetch Notion page content', error: error.message });
  }
});


// --- Gmail API Endpoint ---
app.post('/api/gmail/get-email-content', async (req, res) => {
  try {
    const { accessToken, emailId } = req.body;
    if (!accessToken || !emailId) {
      return res.status(400).json({ message: 'Access token and email ID are required' });
    }

    oauth2Client.setCredentials({ access_token: accessToken });
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const response = await gmail.users.messages.get({
      userId: 'me',
      id: emailId,
      format: 'full' // or 'full' for more details
    });

    const message = response.data;
    const headers = message.payload.headers;
    const subject = headers.find(header => header.name === 'Subject')?.value || 'No Subject';
    const sender = headers.find(header => header.name === 'From')?.value || 'Unknown Sender';

    let snippet = '';
    if (message.payload.parts) {
      const part = message.payload.parts.find(p => p.mimeType === 'text/plain' || p.mimeType === 'text/html');
      if (part && part.body && part.body.data) {
        snippet = Buffer.from(part.body.data, 'base64').toString('utf8');
        snippet = snippet.substring(0, 200) + '...'; // Take first 200 chars
      }
    } else if (message.payload.body && message.payload.body.data) {
      snippet = Buffer.from(message.payload.body.data, 'base64').toString('utf8');
      snippet = snippet.substring(0, 200) + '...';
    }


    res.status(200).json({
      subject,
      sender,
      snippet: snippet.trim()
    });

  } catch (error) {
    console.error('Error fetching Gmail content:', error);
    res.status(500).json({ message: 'Failed to fetch Gmail content', error: error.message });
  }
});


app.post('/api/gmail/list-emails', async (req, res) => {
  try {
    const { accessToken, maxResults = 5 } = req.body; // Default to 5 emails
    if (!accessToken) {
      return res.status(400).json({ message: 'Access token is required' });
    }

    oauth2Client.setCredentials({ access_token: accessToken });
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // List messages
    const listResponse = await gmail.users.messages.list({
      userId: 'me',
      maxResults: maxResults,
      q: 'in:inbox' // Only list emails in the inbox
    });

    const messages = listResponse.data.messages || [];
    const emailDetails = [];

    for (const msg of messages) {
      const getResponse = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id,
        format: 'full'
      });

      const message = getResponse.data;
      const headers = message.payload.headers;
      const subject = headers.find(header => header.name === 'Subject')?.value || 'No Subject';
      const sender = headers.find(header => header.name === 'From')?.value || 'Unknown Sender';

      let snippet = '';
      if (message.payload.parts) {
        const part = message.payload.parts.find(p => p.mimeType === 'text/plain' || p.mimeType === 'text/html');
        if (part && part.body && part.body.data) {
          snippet = Buffer.from(part.body.data, 'base64').toString('utf8');
          snippet = snippet.substring(0, 200) + '...';
        }
      } else if (message.payload.body && message.payload.body.data) {
        snippet = Buffer.from(message.payload.body.data, 'base64').toString('utf8');
        snippet = snippet.substring(0, 200) + '...';
      }

      emailDetails.push({
        id: msg.id,
        subject,
        sender,
        snippet: snippet.trim()
      });
    }

    res.status(200).json(emailDetails);

  } catch (error) {
    console.error('Error listing Gmail emails:', error);
    res.status(500).json({ message: 'Failed to list Gmail emails', error: error.message });
  }
});


app.get('/', (req, res) => {
  res.send('NotiMail Backend is running!');
});

app.listen(port, () => {
  console.log(`NotiMail Backend listening at http://localhost:${port}`);
});
