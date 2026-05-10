import './index.css';
import React from 'react';
import { render } from 'react-dom';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { App } from './App';
import { POSTHOG_KEY, POSTHOG_HOST } from './analytics/config';

posthog.init(POSTHOG_KEY, {
  api_host: POSTHOG_HOST,
  capture_pageview: false,
  autocapture: false,
});

render(
  <PostHogProvider client={posthog}>
    <App />
  </PostHogProvider>,
  document.getElementById('root')
);
