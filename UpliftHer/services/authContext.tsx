import React, { PropsWithChildren, useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';

const AuthContext = React.createContext<{ signIn: () => void; signOut: () => void; session?: string | null, isLoading: boolean } | null>(null);

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: PropsWithChildren<any>) {
  const [session, setSession] = useLocalStorage("session");
  const [isLoading, setLoading] = useState(false);
  
  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // TODO Perform sign-in logic here
          setSession('xxx');
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}