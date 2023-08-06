export const SET_FEEDS = (feeds) => {
  console.log("ENTERED FEEDS ACTIONS");
  return {
    type: "SET_FEEDS",
    feeds: feeds,
  };
};

export const SET_FEEDS_NULL = () => {
  return {
    type: "SET_FEEDS_NULL",
    feeds: null,
  };
};
