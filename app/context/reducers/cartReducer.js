const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.item],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.item._id),
      };

    case 'EMPTY_CART':
      return {
        ...state,
        cart: [],
      };

    case 'SET_CART_ITEMS':
      return {
        ...state,
        cart: action.items,
      };

    default:
      return state;
  }
};

export default cartReducer;

