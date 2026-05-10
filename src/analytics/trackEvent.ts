import { useCallback } from 'react';
import { usePostHog } from 'posthog-js/react';
import { PROJECT_NAME } from './config';

// TravelOS analytics events. Keep this list in sync with the call sites:
//   - page_view                  — usePageView, every route change — { path }
//   - nav_link_clicked           — TopNav header links — { label, target_path, source: 'desktop' | 'mobile' }
//   - logo_clicked               — TopNav brand mark
//   - mobile_menu_toggled        — TopNav hamburger — { open }
//   - cta_clicked                — Page-level CTA — { cta, source, target_path? }
//   - next_action_clicked        — Active trip "Up Next" card CTA — { event_type, label, target }
//   - trip_switched              — Active trip changed — { trip_id, source: 'home' | 'demo_panel' }
//   - demo_panel_toggled         — DemoControlPanel open/close — { open }
//   - demo_disruption_triggered  — DemoControlPanel disruption — { kind: 'delay' | 'gate_change' }
//   - demo_trip_reset            — DemoControlPanel reset button
//
// Every event automatically gets `project_name: 'TravelOS'` so the shared
// Portfolio PostHog project can filter/group across apps. PostHog attaches a
// server-side timestamp to every captured event, so callers don't pass one.

type EventProperties = Record<string, unknown>;

export function useTrackEvent() {
  const posthog = usePostHog();

  return useCallback(
    (event: string, properties?: EventProperties) => {
      if (!posthog) return;
      posthog.capture(event, { project_name: PROJECT_NAME, ...properties });
    },
    [posthog]
  );
}
