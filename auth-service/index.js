require('dotenv').config();
const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:8080'],
  credentials: true
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'ninja-session-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Auth0 configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  secret: process.env.SESSION_SECRET || 'ninja-session-secret',
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email'
  }
};

// Enable Auth0 middleware
app.use(auth(config));

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// User profile endpoint
app.get('/profile', requiresAuth(), (req, res) => {
  res.json(req.oidc.user);
});

// Check if user is authenticated
app.get('/is-authenticated', (req, res) => {
  res.json({ isAuthenticated: req.oidc.isAuthenticated() });
});

// Get access token for API calls
app.get('/token', requiresAuth(), async (req, res) => {
  try {
    // This is a simplified example. In a real app, you'd implement proper token management
    res.json({ 
      token: req.oidc.idToken,
      expiresIn: 3600
    });
  } catch (error) {
    console.error('Token error:', error);
    res.status(500).json({ error: 'Failed to get token' });
  }
});

// Proxy API requests to NocoBase with authentication
app.use('/api', requiresAuth(), async (req, res) => {
  try {
    const apiUrl = `${process.env.API_URL}${req.url}`;
    const method = req.method.toLowerCase();
    const options = {
      method,
      url: apiUrl,
      headers: {
        'Authorization': `Bearer ${req.oidc.idToken}`,
        'Content-Type': 'application/json'
      }
    };

    if (['post', 'put', 'patch'].includes(method)) {
      options.data = req.body;
    }

    const response = await axios(options);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('API proxy error:', error);
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'API request failed' });
  }
});

// White label configuration endpoint
app.get('/branding', (req, res) => {
  res.json({
    companyName: process.env.COMPANY_NAME || 'Ninja OS',
    logoUrl: process.env.COMPANY_LOGO_URL || '/logo.png',
    primaryColor: process.env.PRIMARY_COLOR || '#3498db',
    secondaryColor: process.env.SECONDARY_COLOR || '#2ecc71',
    accentColor: process.env.ACCENT_COLOR || '#e74c3c',
    fontFamily: process.env.FONT_FAMILY || 'Roboto, sans-serif'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Auth service listening at http://localhost:${port}`);
});