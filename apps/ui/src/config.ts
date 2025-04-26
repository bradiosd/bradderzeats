// Application configuration
export const config = {
  // Base API URL - change based on environment
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',

  // App metadata
  appName: 'Bradderz Eats',
  appDescription: 'Find the best food discount codes',

  // Theme settings
  theme: {
    defaultTheme: 'light',
    storageKey: 'bradderz-theme',
  },

  // Social media links
  socialLinks: {
    instagram: 'https://instagram.com/bradderzeats',
    facebook: 'https://facebook.com/bradderzeats',
    youtube: 'https://youtube.com/@bradderzeats',
    tiktok: 'https://tiktok.com/@bradderzeats',
  },

  // Analytics configuration
  analytics: {
    enabled: process.env.NODE_ENV === 'production',
    measurementId: process.env.REACT_APP_GA_MEASUREMENT_ID,
  }
}; 