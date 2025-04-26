// Application configuration
export const config = {
  // Base API URL - change based on environment
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',

  // App metadata
  appName: 'Bradders Eats',
  appDescription: 'Find the best food discount codes',

  // Theme settings
  theme: {
    defaultTheme: 'light',
    storageKey: 'bradders-theme',
  },

  // Social media links
  socialLinks: {
    instagram: 'https://instagram.com/bradderseats',
    facebook: 'https://facebook.com/bradderseats',
    youtube: 'https://youtube.com/bradderseats',
    tiktok: 'https://tiktok.com/@bradderseats',
  },

  // Analytics configuration
  analytics: {
    enabled: process.env.NODE_ENV === 'production',
    measurementId: process.env.REACT_APP_GA_MEASUREMENT_ID,
  }
}; 