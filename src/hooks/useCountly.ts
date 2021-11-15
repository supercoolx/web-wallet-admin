/* eslint-disable camelcase */
import { useEffect } from 'react';

type CountyType = {
  app_key: string;
  url: string;
  q: Array<Array<string>>;
  init(): void;
};

declare let Countly: CountyType | undefined;

// not use at moment. not working
export default () => {
  useEffect(() => {
    const cly = document.createElement('script');
    cly.type = 'text/javascript';
    cly.async = true;
    cly.src = 'https://countly.bc-labs.dev/sdk/web/countly.min.js';
    cly.onload = function () {
      if (Countly) {
        Countly = {
          ...Countly,
          app_key: '5325d564c7d93ce4bdd9d33805f4a7b2fd196a24',
          url: 'https://countly.bc-labs.dev',
        };

        Countly.q = [
          ...Countly.q,
          ['track_sessions'],
          ['track_pageview'],
          ['track_clicks'],
          ['track_scrolls'],
          ['track_errors'],
          ['track_links'],
          ['track_forms'],
          ['collect_from_forms'],
        ];

        Countly.init();
      }
    };
    const s = document.getElementsByTagName('script')[0];
    s.parentNode?.insertBefore(cly, s);

    return () => {
      document.body.removeChild(cly);
    };
  }, []);
};
