import * as Sentry from '@sentry/browser';


Sentry.init({
  dsn: 'https://ceeae75246a14736922ea43d46d5ce88@sentry.io/2244671',
  beforeSend: event => {
    if ( process.env.NODE_ENV === 'development' ) {
      return null;
    }
    return event;
  },
});

