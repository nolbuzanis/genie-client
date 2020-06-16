import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GTM-M89W9ZJ',
};

const production = process.env.REACT_APP_ENV === 'production';

export const initGA = () => {
  if (production) {
    //.initialize('UA-104067820-3');
    TagManager.initialize(tagManagerArgs);
    //ReactGA.initialize('218385872');
  }
  // } else {
  //   ReactGA.initialize('UA-104067820-4');
  // }
};

export const initFBPixel = () => {
  const facebookPixelID = '232351294764626';
  const FBPoptions = {
    autoConfig: true, // set pixel's autoConfig
    debug: true, // enable logs
  };

  if (production) {
    ReactPixel.init(facebookPixelID, {}, FBPoptions);
    console.log('FB Pixel active.');
  }
};

export const TrackPixelEvent = (eventName, data) => {
  if (production) {
    ReactPixel.trackCustom(eventName, data);
    console.log('Reporting event: ', eventName);
  }
};

export const TrackPixelPageView = () => {
  if (production) {
    ReactPixel.pageView();
    console.log('Pageview!');
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
    label: label,
  });
};
