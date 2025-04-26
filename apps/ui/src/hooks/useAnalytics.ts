import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../lib/analytics';

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views on route change
    trackEvent('page_view', {
      page_location: window.location.href,
      page_path: location.pathname,
      page_title: document.title,
    });
  }, [location]);

  return null;
}; 