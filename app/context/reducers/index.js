import { combineReducers } from "redux";
import feedsReducer from "./feedsReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  feeds: feedsReducer,
  cartItems: cartReducer,
  wishlistItems: wishlistReducer,
  user: userReducer,
});

export default rootReducer;



