import { useContext, createContext, useReducer } from "react";
import { createRoutesFromChildren } from "react-router-dom";

const UserContext = createContext(null);

const initialUser = {
  name: null,
  role: null,
  user_id: null,
  token: null,
};

function userReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        name: payload.user_name,
        role: payload.role,
        token: payload.token,
        user_id: payload.user_id,
      };
    case "LOGOUT":
      return { ...state, name: null, role: null, token: null, user_id: null };
    default:
      console.log("Unknown User Action");
  }
}
function AuthProvider({ children }) {
  const [userState, dispatch] = useReducer(userReducer, initialUser);
  function UserLogin(user) {
    alert("CALLED");
    dispatch({ type: "LOGIN", payload: user });
  }
  function UserLogout() {
    dispatch({ type: "LOGOUT" });
  }
  return (
    <UserContext.Provider value={{ UserLogin, UserLogout, userState }}>
      {children}
    </UserContext.Provider>
  );
}
function useAuthContext() {
  const { UserLogin, UserLogout, userState } = useContext(UserContext);
  return { UserLogin, UserLogout, userState };
}
export { AuthProvider, useAuthContext };
