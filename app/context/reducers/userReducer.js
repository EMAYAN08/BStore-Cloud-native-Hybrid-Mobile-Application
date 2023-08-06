const initialState = {
      userData: {},
    };
    
    const userReducer = (state = initialState, action) => {
      switch (action.type) {
        case "GET_USER_DATA":
          return {
            ...state,
            userData: action.payload,
          };
        case "LOGOUT_USER":
          return {
            ...state,
            userData: {},
          };
        default:
          return state;
      }
    };
    
    export default userReducer;
    