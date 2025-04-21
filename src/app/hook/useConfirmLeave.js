'use client'
import { useEffect } from 'react';

export default function useConfirmNavigation(message) {
  useEffect(() => {
    // Handle Next.js <Link> clicks
    const handleClick = (e) => {
      const link = e.target.closest('a[href]');
      if (link && link.origin === window.location.origin) {
        const shouldLeave = window.confirm(message);
        if (!shouldLeave) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    // Handle browser refresh / close / typing new URL
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = message; // Needed for most browsers
      return message;
    };

    // Handle browser back/forward buttons (← / →)
    const handlePopState = () => {
      const shouldLeave = window.confirm(message);
      if (!shouldLeave) {
        window.history.pushState(null, '', window.location.href); // Stay on same page
      }
    };

    // Push current state to prevent silent popstate
    window.history.pushState(null, '', window.location.href);

    // Add all listeners
    document.addEventListener('click', handleClick, true);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    // Clean up on unmount
    return () => {
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [message]);
}
