import axios from 'axios';
import { getUserData } from './userActions';

export const addToCart = (data) => {
  return async (dispatch, getState) => {
    try {
      //await dispatch(getUserData());
      console.log("Data inside addToCart:  ",data);
      console.log("id of the Data inside addToCart:  ",data.data._id);
      console.log("id of the Data inside addToCart:  ",data.qty);
      const userID = getState().user.userData.email;
      const response = await axios.put('https://qrl0a8fn17.execute-api.us-east-1.amazonaws.com/dev/cart', {
        "userID": userID,
        "itemID": data.data._id,
        "qty": data.qty
      });
      if (response.status === 200) {
        dispatch({
          type: 'ADD_TO_CART',
          item: data,
        });
      }
    } catch (error) {
      console.log('Error adding to cart in cart actions add to cart:', error);
    }
  };
};

export const removeFromCart = (_id) => {
  return async (dispatch, getState) => {
    try {
      //await dispatch(getUserData());
      const userID = getState().user.userData.email;
      const response = await axios.delete('https://qrl0a8fn17.execute-api.us-east-1.amazonaws.com/dev/cart', {
        data: {
          "userID": userID,
          "itemID": _id,
        },
      });
      console.log("response status: ", response.status);
      if (response.status === 200) {
        dispatch({
          type: 'REMOVE_FROM_CART',
          itemID: _id,
        });
      }
    } catch (error) {
      console.log('Error removing from cart in cart actions in removefromcart:', error);
    }
  };
};

export const fetchCartItems = () => {
  return async (dispatch, getState) => {
    try {
      //await dispatch(getUserData());
      const userID = getState().user.userData.email;
      const response = await axios.post('https://qrl0a8fn17.execute-api.us-east-1.amazonaws.com/dev/cart', {
        "userID": userID,
      });
      if (response.status === 200) {
        // const cartItems = response.data.cartItems || [];
        const cartItems = response.data.body.cartItems;
        dispatch({
          type: 'SET_CART_ITEMS',
          items: cartItems,
        });
      }
    } catch (error) {
      console.log('Error fetching cart items in cart actions in fetch cart items:', error);
    }
  };
};

export const emptyCart = () => {
  return {
    type: 'EMPTY_CART',
  };
};

