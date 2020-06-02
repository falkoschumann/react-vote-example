import React from 'react';

type AppProps = Readonly<{
  children: JSX.Element[] | JSX.Element;
}>;

export default function App({ children }: AppProps) {
  return (
    <div className="Background">
      <div className="Header">
        <div className="Title">Vote as a Service</div>
      </div>
      <div className="Main">
        <div className="Container">{children}</div>
      </div>
    </div>
  );
}
