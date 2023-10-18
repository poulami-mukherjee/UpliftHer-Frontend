import { useRootNavigation, useRouter, useSegments } from "expo-router";
import React, { useContext, useEffect, useState } from "react";

// ---- (2) ----
// Define the AuthContextValue interface
interface SignInResponse {
  data: string | undefined;
  error: Error | undefined;
}

interface SignOutResponse {
  error: any | undefined;
  data: {} | undefined;
}

interface AuthContextValue {
  signIn: (email: string, password: string) => Promise<SignInResponse>;
  signUp: (email: string, password: string, firstName: string, dateOfBirth: Date) => Promise<SignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  user: string | null;
  authInitialized: boolean;
}

// Define the Provider component
interface ProviderProps {
  children: React.ReactNode;
}

// ---- (3) ----
// Create the AuthContext
const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

// ---- (4) ----
export function Provider(props: ProviderProps) {

  // ---- (5) ----
  const [user, setAuth] =
    React.useState<string | null>(null);
  const [authInitialized, setAuthInitialized] = React.useState<boolean>(false);

  // This hook will protect the route access based on user authentication.
  // ---- (6) ----
  const useProtectedRoute = (user: string | null) => {
    const segments = useSegments();
    const router = useRouter();

    // checking that navigation is all good;
    // ---- (7) ----
    const [isNavigationReady, setNavigationReady] = useState(false);
    const rootNavigation = useRootNavigation();

    // ---- (8) ----
    useEffect(() => {
      const unsubscribe = rootNavigation?.addListener("state", (event) => {
        setNavigationReady(true);
      });
      return function cleanup() {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [rootNavigation]);

    // ---- (9) ----
    React.useEffect(() => {
      if (!isNavigationReady) {
        return;
      }

      const inAuthGroup = segments[0] === "(auth)";

      if (!authInitialized) return;
    }, [user, segments, authInitialized, isNavigationReady]);
  };

  // ---- (10) ----
  useEffect(() => {
    (async () => {
      try {
        const user = null;
        console.log(user);
        setAuth(user);
      } catch (error) {
        console.log("error", error);
        setAuth(null);
      }

      setAuthInitialized(true);
      console.log("initialize ", user);
    })();
  }, []);

  /**
   *
   * @returns
   */
  // ---- (11) ----
  const logout = async (): Promise<SignOutResponse> => {
    try {
      const response = {}; //TODO;
      return { error: undefined, data: response };
    } catch (error) {
      return { error, data: undefined };
    } finally {
      setAuth(null);
    }
  };

  /**
   *
   * @param email
   * @param password
   * @returns
   */
  // ---- (12) ----
  const login = async (
    email: string,
    password: string
  ): Promise<SignInResponse> => {
    try {
      console.log("IN LOGGING"); //TODO
      console.log(email, password); //TODO
      var date = new Date();
      console.log(date);
      var user = "testB"
      console.log("? USER TO SET ", user);
      setAuth(user);
      console.log("USER SET ", user);
      return { data: user, error: undefined };
    } catch (error) {
      setAuth(null);
      return { error: error as Error, data: undefined };
    }
  };

  /**
   * 
   * @param email 
   * @param password 
   * @param username 
   * @returns 
   */
  // ---- (13) ----
  const createAcount = async (
    email: string,
    password: string,
    firstName: string,
    dateOfBirth: Date
  ): Promise<SignInResponse> => {
    try {
      // create the user
      // TODO
      const user = "testC";
      // const user = new User("test@gmail.com", "test", new Date(2000, 1, 1)); //TODO
      setAuth(user);
      return { data: user, error: undefined };
    } catch (error) {
      setAuth(null);
      return { error: error as Error, data: undefined };
    }
  };

  useProtectedRoute(user);

  // ---- (14) ----
  return (
    <AuthContext.Provider
      value={{
        signIn: login,
        signOut: logout,
        signUp: createAcount,
        user,
        authInitialized,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// Define the useAuth hook
// ---- (15) ----
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return authContext;
};