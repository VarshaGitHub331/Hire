import { useContext, createContext, useReducer } from "react";
import { createRoutesFromChildren } from "react-router-dom";

const UserContext = createContext(null);

const initialUser = {
  name: localStorage.getItem("name") || null,
  role: localStorage.getItem("role") || null,
  user_id: localStorage.getItem("user_id") || null,
  token: localStorage.getItem("authToken") || null,
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
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
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
    localStorage.setItem("name", user.user_name);
    localStorage.setItem("role", user.role);
    localStorage.setItem("user_id", user.user_id);
    localStorage.setItem("authToken", user.token);
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
