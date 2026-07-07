
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  /* LOAD USER */

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem(
          "aiUser"
        );

      const token =
        localStorage.getItem(
          "token"
        );

      if (
        storedUser &&
        token
      ) {
        setUser(
          JSON.parse(
            storedUser
          )
        );
      }
    } catch (error) {
      console.error(
        "Failed to restore auth session:",
        error
      );
    }

    setLoading(false);
  }, []);

  /* LOGIN */

  const login = async (email) => {
    const storedUser =
      JSON.parse(
        localStorage.getItem(
          "aiUser"
        )
      );

    if (
      storedUser &&
      storedUser.email ===
        email
    ) {
      localStorage.setItem(
        "token",
        "demo-token"
      );

      setUser(storedUser);

      return true;
    }

    return false;
  };

  /* SIGNUP */

  const signup = async (
    userData
  ) => {
    localStorage.setItem(
      "aiUser",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "token",
      "demo-token"
    );

    setUser(userData);

    return true;
  };

  /* LOGOUT */

  const logout = () => {
    localStorage.removeItem(
      "token"
    );
    localStorage.removeItem(
      "aiUser"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);

