import React from "react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

export const ReduxConnection = (PassedComponent, props?) => {
  return (
    <Provider store={store}>
      <PassedComponent {...props} />
    </Provider>
  );
};
