import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTrackEvent } from './trackEvent';

export function usePageView() {
  const location = useLocation();
  const track = useTrackEvent();
  useEffect(() => {
    track('page_view', { path: location.pathname });
  }, [location.pathname, track]);
}
