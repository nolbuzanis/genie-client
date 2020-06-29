import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import TagManager from 'react-gtm-module';
import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential,
} from 'mongodb-stitch-browser-sdk';
import {
  osName,
  osVersion,
  browserVersion,
  browserName,
  mobileModel,
  deviceType,
} from 'react-device-detect';
import { user_id, session_id } from './index';

let client, mongodb;
const deviceInfo = {
  osName,
  osVersion,
  browserVersion,
  browserName,
  mobileModel,
  deviceType,
};

export const initMongoDBApp = async () => {
  try {
    client = Stitch.initializeDefaultAppClient('genieweb-nzahg');
    mongodb = client.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-atlas'
    );
    await client.auth.loginWithCredential(new AnonymousCredential());
  } catch (error) {
    console.log('MongoDB Auth failed: ', error);
  }
};

export const reportMongoDBEvent = async (name, data, slim = false) => {
  let eventCollection;
  try {
    if (process.env.REACT_APP_ENV === 'production') {
      eventCollection = mongodb.db('production').collection('events');
    } else {
      eventCollection = mongodb.db('staging').collection('events-staging');
    }

    let geo;
    try {
      geo = JSON.parse(localStorage.getItem('geo'));
    } catch (err) {
      console.log('error fetching geo:', err);
    }

    if (slim) {
      await eventCollection.insertOne({
        name,
        user_id,
        session_id,
        ...data,
      });
    } else {
      await eventCollection.insertOne({
        name,
        user_id,
        session_id,
        ...data,
        deviceInfo,
        geo,
      });
    }
  } catch (error) {
    console.log('Error reporting mongo event: ', error);
  }
};

const tagManagerArgs = {
  gtmId: 'GTM-M89W9ZJ',
};

const production = process.env.REACT_APP_ENV === 'production';

export const initGA = () => {
  if (production) {
    ReactGA.initialize('UA-104067820-3');
    TagManager.initialize(tagManagerArgs);
  } else {
    ReactGA.initialize('UA-104067820-4');
    //TagManager.initialize(tagManagerArgs);
  }
};

export const reportEvent = (eventName, data = {}) => {
  if (production) {
    const args = {
      dataLayer: {
        ...data,
        event: eventName,
      },
      dataLayerName: 'PageDataLayer',
    };

    TagManager.dataLayer(args);
  }
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
