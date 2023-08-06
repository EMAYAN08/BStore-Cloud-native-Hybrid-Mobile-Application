const initialState = {
  wishlist: [],
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (state.wishlist.some((item) => item._id === action.item._id)) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.item],
      };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item._id !== action.itemID),
      };

    case 'EMPTY_WISHLIST':
      return {
        ...state,
        wishlist: [],
      };

    case 'SET_WISHLIST_ITEMS':
      return {
        ...state,
        wishlist: action.items,
      };

    default:
      return state;
  }
};

export default wishlistReducer;


