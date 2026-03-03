import type { Location, NavigateFunction } from 'react-router-dom';

export interface LandingNavigationState {
  scrollToSectionId?: string;
}

export function scrollToLandingSection(sectionId: string): boolean {
  if (!sectionId) return false;
  const section = document.getElementById(sectionId);
  if (!section) return false;

  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
}

export function navigateToLandingSection(
  navigate: NavigateFunction,
  currentPathname: string,
  sectionId: string,
): void {
  if (!sectionId) return;

  if (currentPathname === '/') {
    scrollToLandingSection(sectionId);
    return;
  }

  navigate('/', {
    state: {
      scrollToSectionId: sectionId,
    } satisfies LandingNavigationState,
  });
}

export function getRequestedLandingSection(location: Location): string | null {
  const state = location.state as LandingNavigationState | null;
  if (state?.scrollToSectionId) {
    return state.scrollToSectionId;
  }

  if (location.hash) {
    const hashSection = location.hash.replace('#', '').trim();
    return hashSection || null;
  }

  return null;
}

