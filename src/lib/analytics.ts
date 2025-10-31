declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
  }
}

export const pageview = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: url,
      page_title: document.title,
    });
    console.log('✅ GA page view sent:', url);
  }
};

export const event = (
  action: string,
  params?: Record<string, unknown>
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
    console.log('✅ GA event sent:', action, params);
  }
};
