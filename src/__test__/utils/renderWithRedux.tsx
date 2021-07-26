import { render } from "@testing-library/react";
import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { rootReducer } from "../../store/rootReducer";

export interface IRenderParams {
  preloadedState: any;
  store: EnhancedStore;
}

const renderWithRedux = (
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  } = {} as IRenderParams
) => {
  const utils = {
    getState() {
      return store.getState();
    },
    dispatch(action: AnyAction) {
      return store.dispatch(action);
    },
  };
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    ...utils,
    ...renderOptions,
  };
};

export { renderWithRedux };
