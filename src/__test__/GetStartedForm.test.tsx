import { GetStartedForm } from "../components/GetStartedForm";
import { render, screen, waitFor } from "@testing-library/react";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer, { initialState } from "../store/modules/user/user";
import userEvent from "@testing-library/user-event";
import { LoadingUserState } from "../store/modules/user/types";

interface IRenderParams {
  preloadedState: any;
  store: EnhancedStore;
}

const createMockStore = (state = initialState) => {
  return configureStore({
    reducer: { user: userReducer },
    preloadedState: { user: state },
  });
};

const renderWithRedux = (
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: { user: userReducer }, preloadedState }),
    ...renderOptions
  } = {
    store: createMockStore(),
  } as IRenderParams
) => {
  const utils = {
    getState() {
      return store.getState();
    },
  };
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    ...utils,
  };
};

describe("GetStartedForm tests", () => {
  it("Renders component", () => {
    renderWithRedux(<GetStartedForm />);
    expect(screen.getByLabelText(/Your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Create new user on valid form", async () => {
    const { getState } = renderWithRedux(<GetStartedForm />);

    const nameInput = screen.getByLabelText(/Your name/i);
    expect(nameInput).toHaveValue("");
    userEvent.type(nameInput, "John");
    expect(nameInput).toHaveValue("John");

    const emailInput = screen.getByLabelText(/Your email/i);
    userEvent.type(emailInput, "John@mail.ru");
    expect(emailInput).toHaveValue("John@mail.ru");

    const passInput = screen.getByLabelText(/Your password/i);
    userEvent.type(passInput, "123");
    expect(passInput).toHaveValue("123");

    const passConfirmInput = screen.getByLabelText(/Confirm password/i);
    userEvent.type(passConfirmInput, "123");
    expect(passConfirmInput).toHaveValue("123");

    const submitBtn = screen.getByRole("button");

    expect(getState().user.loadingState).toEqual("NEVER");
    await waitFor(() => userEvent.click(submitBtn));
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(getState().user.loadingState).toEqual("LOADINGCREATE");
  });

  it("Show validation error fields", async () => {
    const { getState } = renderWithRedux(<GetStartedForm />);

    const nameInput = screen.getByLabelText(/Your name/i);
    expect(nameInput).toHaveValue("");
    userEvent.type(nameInput, "JohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohn");
    expect(nameInput).toHaveValue(
      "JohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohn"
    );
    const emailInput = screen.getByLabelText(/Your email/i);
    expect(emailInput).toHaveValue("");
    userEvent.type(
      emailInput,
      "JohnJohnJohnJohnJohnJohnJohnJJohnJohnJohnJohnohnJohnJohJohnJohnJohnnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohn@mail.ru"
    );
    expect(emailInput).toHaveValue(
      "JohnJohnJohnJohnJohnJohnJohnJJohnJohnJohnJohnohnJohnJohJohnJohnJohnnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohn@mail.ru"
    );
    const passInput = screen.getByLabelText(/Your password/i);
    expect(passInput).toHaveValue("");

    const passConfirmInput = screen.getByLabelText(/Confirm password/i);
    expect(passConfirmInput).toHaveValue("");

    const submitBtn = screen.getByRole("button");
    await waitFor(() => userEvent.click(submitBtn));
    expect(
      screen.getByText(/Max name length is 40 characters/)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Max email length is 100 characters/)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Required/)).toHaveLength(2);
    expect(getState().user.loadingState).toEqual("NEVER");
  });

  it("Show error snackbar on error loading user state", async () => {
    const errorState = { user: null, loadingState: LoadingUserState.ERROR };
    renderWithRedux(<GetStartedForm />, {
      preloadedState: errorState,
      store: createMockStore(errorState),
    });
    expect(screen.getByText(/Something got wrong/i)).toBeInTheDocument();
  });

  it("Show error snackbar on error with regisration email loading user state", async () => {
    const errorState = {
      user: null,
      loadingState: LoadingUserState.ERROREMAIL,
    };
    renderWithRedux(<GetStartedForm />, {
      preloadedState: errorState,
      store: createMockStore(errorState),
    });
    expect(screen.getByText(/Email is already taken/i)).toBeInTheDocument();
  });

  it("Close error snackbar on close icon click", async () => {
    const errorState = {
      user: null,
      loadingState: LoadingUserState.ERROR,
    };
    renderWithRedux(<GetStartedForm />, {
      preloadedState: errorState,
      store: createMockStore(errorState),
    });
    expect(screen.queryByText(/Something got wrong/i)).toBeInTheDocument();
    const closeIcon = screen.getByRole("button", { name: /Close/i });
    expect(closeIcon).toBeInTheDocument();

    await waitFor(() => userEvent.click(closeIcon));
    await waitFor(() =>
      expect(screen.queryByText(/Something got wrong/i)).not.toBeInTheDocument()
    );
  });
});
