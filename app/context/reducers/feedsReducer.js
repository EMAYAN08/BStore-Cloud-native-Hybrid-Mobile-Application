const feedsReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_FEEDS":
      console.log("ENTERED SET FEEDS REDUCER");
      console.log("ENTERED ACTIONS FEEDS REDUCER: ",action.feeds);
      return {
        ...state,
        feeds: action.feeds,
      };

    case "SET_FEEDS_NULL":
      return {
        ...state,
        feeds: null,
      };

    default:
      return state;
  }
};

export default feedsReducer;
