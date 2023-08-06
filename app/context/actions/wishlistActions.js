import axios from 'axios';
import { getUserData } from './userActions';

export const addToWishlist = (data) => {
  return async (dispatch, getState) => {
    try {
      //await dispatch(getUserData());
      const userID = getState().user.userData.email;
      const response = await axios.put('https://qrl0a8fn17.execute-api.us-east-1.amazonaws.com/dev/wishlist', {
        "userID":userID,
        "itemID": data._id,
      });
      if (response.status === 200) {
        dispatch({
          type: 'ADD_TO_WISHLIST',
          item: data,
        });
      }
    } catch (error) {
      console.log('Error adding to wishlist in wishlist actions add to wish list:', error);
    }
  };
};

export const removeFromWishlist = (_id) => {
  return async (dispatch, getState) => {
    try {
      //await dispatch(getUserData());
      console.log("this is the id going into the delete API: ", _id);
      const userID = getState().user.userData.email;
      const response = await axios.delete('https://qrl0a8fn17.execute-api.us-east-1.amazonaws.com/dev/wishlist', {
        data: {
          "userID":userID,
          "itemID": _id,
        },
      });
      if (response.status === 200) {
        dispatch({
          type: 'REMOVE_FROM_WISHLIST',
          itemID: _id,
        });
      }
    } catch (error) {
      console.log('Error removing from wishlist in wish list actions in removefromwishlist:', error);
    }
  };
};

export const fetchWishlistItems = () => {
  return async (dispatch, getState) => {
    try {
      //await dispatch(getUserData());
      const userID = getState().user.userData.email;
      const response = await axios.post('https://qrl0a8fn17.execute-api.us-east-1.amazonaws.com/dev/wishlist', {
        "userID":userID,
      });
      if (response.status === 200) {
        //console.log("inside response of fetch wish list items in wish list actions:", JSON.stringify(response))
        // const wishlistItems = response.data.wishlistItems || [];
        const wishlistItems = response.data.body.wishlistItems;
        //console.log("wish list items inside response of fetch wish list items in wish list actions:", wishlistItems)
        dispatch({
          type: 'SET_WISHLIST_ITEMS',
          items: wishlistItems,
        });
      }
    } catch (error) {
      console.log('Error fetching wishlist items in wishlist actions in fetch wish list items:', error);
    }
  };
};

export const emptyWishlist = () => {
  return {
    type: 'EMPTY_WISHLIST',
  };
};

