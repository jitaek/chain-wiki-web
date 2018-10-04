import ReactGA from 'react-ga';

export function initializeAnalytics() {
    ReactGA.initialize('UA-73091430-2');
}

export function logPageView() {
    ReactGA.pageview(window.location.pathname + window.location.search);
}