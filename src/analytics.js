import ReactGA from 'react-ga';

export const initGA = () => {
  if (process.env.REACT_APP_ENV === 'production') {
    ReactGA.initialize('UA-104067820-3');
  } else {
    ReactGA.initialize('UA-104067820-4');
  }
};

// export const PageView = () => {
//   ReactGA.pageview(window.location.pathname +
//     window.location.search);
// };

/**
 * Event - Add custom tracking event.
 * @param {string} category 
 * @param {string} action 
 * @param {string} label 
 */
export const Event = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
};