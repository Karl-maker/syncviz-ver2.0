const constants = {
  CREATE_VIRTUAL_ROOM: "/manage-virtual-room",
  VIRTUAL_FEED: "/",
  VIRTUAL_ROOM: "/virtual-room",
  VIRTUAL_ROOM_SEARCH: "/virtual-rooms",
  ABOUT: "/about",
  CONTACT: "/contact",
  HELP: "/help",
  SURVEY: "/survey",
  PRIVACY_POLICY: "/privacy-policy",
  COOKIE_POLICY: "/cookie-policy",
  TERMS_AND_CONDITIONS: "terms-and-conditions",
  LEARN_MORE: "/learn-more",
};

export const NESTED = {
  LEARN_MORE: {
    INDEX: constants.LEARN_MORE,
    VIRTUAL_ROOM: "/virtual-room",
    TAG: "/3d-tags",
    SHARING: "/3d-sharing",
  },
};

export const ID = {
  LEARN_MORE: {
    LABELS: "learnmorelabels",
    ANNOTATIONS: "learnmoreannotations",
    CALL_TO_ACTIONS: "learnmorecalltoactions",
    THRIVE_AREAS: "learnmoreareasthrive-in",
    SYNCPOLY: "whatissyncpoly",
  },
};

export default constants;
