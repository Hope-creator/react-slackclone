import { SignInForm } from "../components/SignInForm";
import { screen, waitFor } from "@testing-library/react";
import { setUserLoadingState } from "../store/modules/user/user";
import userEvent from "@testing-library/user-event";
import { LoadingUserState } from "../store/modules/user/types";
import { renderWithRedux } from "./utils/renderWithRedux";

describe("SignInForm tests", () => {
  it("Renders component", () => {
    renderWithRedux(<SignInForm />);
    expect(screen.getByText(/Sign in with Email/i)).toBeInTheDocument();
  });
  it("should fetch user on submit button click", async () => {
    const { getState } = renderWithRedux(<SignInForm />);
    const emailInput = screen.getByLabelText(/name@work-email.com/i);
    userEvent.type(emailInput, "John@mail.ru");
    expect(emailInput).toHaveValue("John@mail.ru");
    const passInput = screen.getByLabelText(/Your password/i);
    userEvent.type(passInput, "123");
    expect(passInput).toHaveValue("123");
    const submitBtn = screen.getByRole("button");

    expect(getState().user.loadingState).toEqual("NEVER");
    await waitFor(() => userEvent.click(submitBtn));
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(getState().user.loadingState).toEqual(LoadingUserState.LOADINGLOGIN);
  });
  it("show error snackbar on error with error login loading user state", async () => {
    const { dispatch } = renderWithRedux(<SignInForm />);
    await waitFor(() =>
      dispatch(setUserLoadingState(LoadingUserState.ERRORLOGIN))
    );
    expect(
      await screen.findByText(/Wrong email or password/i)
    ).toBeInTheDocument();
  });
  it("show validation error if no value passed to inputs", async () => {
    const { getState } = renderWithRedux(<SignInForm />);
    expect(getState().user.loadingState).toEqual("NEVER");
    const submitBtn = screen.getByRole("button");
    await waitFor(() => userEvent.click(submitBtn));
    expect(screen.getAllByText(/Required/i)).toHaveLength(2);
    expect(getState().user.loadingState).toEqual("NEVER");
  });

  it("close error snackbar on close icon click", async () => {
    const { dispatch } = renderWithRedux(<SignInForm />);
    await waitFor(() =>
      dispatch(setUserLoadingState(LoadingUserState.ERRORLOGIN))
    );
    expect(
      await screen.findByText(/Wrong email or password/i)
    ).toBeInTheDocument();
    const closeIcon = screen.getByRole("button", { name: /Close/i });
    expect(closeIcon).toBeInTheDocument();

    await waitFor(() => userEvent.click(closeIcon));
    await waitFor(() =>
      expect(
        screen.queryByText(/Wrong email or password/i)
      ).not.toBeInTheDocument()
    );
  });
});
