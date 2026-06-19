// Google Analytics 4 Event Tracking Helper

/**
 * Send a custom event to Google Analytics 4.
 * @param action The event action (e.g., 'click', 'download', 'submit')
 * @param category The event category (e.g., 'resume', 'project', 'contact')
 * @param label A descriptive label for the event (e.g., 'resume_download_navbar', 'univault_view')
 * @param value An optional numeric value associated with the event
 */
export const trackEvent = (action: string, category: string, label: string, value?: number) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
