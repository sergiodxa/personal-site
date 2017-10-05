import ReactGA from 'react-ga';

export const hasInitialized = () => {
  if (typeof window !== 'undefined') {
    return window.GA_INITIALIZED;
  }
  return false;
}

export const initGA = () => {
  ReactGA.initialize('UA-48432002-3');
  window.GA_INITIALIZED = true;
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
