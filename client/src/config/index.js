const env = process.env;

const variables = {
  API: {
    LIVE_SERVER: env.REACT_APP_LIVE_SERVER_API || window.location.origin,
    STORAGE: env.REACT_APP_STORAGE_API || "",
  },
  Google: {
    Analytics: {
      TRACKING_ID: env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID,
    },
    OAuth: {
      CLIENT_ID: env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || "",
      SECRET_ID: env.REACT_APP_GOOGLE_OAUTH_SECRET_ID || "",
    },
  },
};

export default variables;
