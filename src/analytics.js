import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

const production = process.env.REACT_APP_ENV === 'production';

export const initGA = () => {
  if (process.env.REACT_APP_ENV === 'production') {
    ReactGA.initialize('UA-104067820-3');
  } else {
    ReactGA.initialize('UA-104067820-4');
  }
};

export const initFBPixel = () => {
  const facebookPixelID = '232351294764626';
  const FBPoptions = {
    autoConfig: true, // set pixel's autoConfig
    debug: false // enable logs
  };

  if (production) ReactPixel.init(facebookPixelID, FBPoptions);
};

export const TrackPixelEvent = (eventName, data) => {
  if (production) ReactPixel.trackCustom(eventName, data);
};

export const TrackPixelPageView = () => {
  if (production) ReactPixel.pageView();
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
