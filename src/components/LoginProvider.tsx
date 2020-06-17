import React from 'react';

type LoginContextType = Readonly<{
  loggedIn: boolean;
  login: () => void;
}>;

const LoginContext = React.createContext<LoginContextType>({
  loggedIn: false,
  login: () => null,
});

type LoginProviderProps = Readonly<{
  children?: JSX.Element | JSX.Element[];
}>;

export default function LoginProvider({ children }: LoginProviderProps) {
  const [loggedIn, setLoggedIn] = React.useState(false);

  function login() {
    setLoggedIn(true);
  }

  return <LoginContext.Provider value={{ loggedIn, login }}>{children}</LoginContext.Provider>;
}

export function useLogin() {
  return React.useContext(LoginContext);
}
