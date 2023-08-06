import { userPool } from "../../utils/cognito";

export const getUserData = () => {
  return (dispatch) => {
    try {
      const currentUser = userPool.getCurrentUser();
      if (currentUser) {
        currentUser.getSession((err, session) => {
          if (err) {
            console.log("Error fetching user data:", err);
            return;
          }
          const username = session.getIdToken().payload["cognito:username"];
          const email = session.getIdToken().payload.email;
          const user = {
            username,
            email,
          };
          dispatch({
            type: "GET_USER_DATA",
            payload: user,
          });
        });
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    try {
      const currentUser = userPool.getCurrentUser();
      if (currentUser) {
        currentUser.signOut();
      }
      dispatch({
        type: "LOGOUT_USER",
      });
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };
};
