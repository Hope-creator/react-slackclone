import { EditProfileModal } from "../components/EditProfileModal";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoadingUserState } from "../store/modules/user/types";
import { renderWithRedux } from "./utils/renderWithRedux";
import { stubUser } from "./utils/stubs";

describe("EditProfileModal tests", () => {
  it("renders component if clicked on modal opener", () => {
    renderWithRedux(
      <EditProfileModal opener={<div>Opener</div>} me={stubUser} />
    );
    userEvent.click(screen.getByText(/opener/i));
    expect(screen.getByText(/Edit your profile/i)).toBeInTheDocument();
  });

  it("should close modal on cancel button click", () => {
    renderWithRedux(
      <EditProfileModal opener={<div>Opener</div>} me={stubUser} />
    );
    userEvent.click(screen.getByText(/opener/i));
    expect(screen.getByText(/Edit your profile/i)).toBeInTheDocument();
    const closeButton = screen.getByRole("button", { name: /cancel/i });
    userEvent.click(closeButton);
    expect(screen.queryByText(/Edit your profile/i)).not.toBeInTheDocument();
  });

  it("should dispatch update avatar on upload image button click", () => {
    const file = new File([new ArrayBuffer(1)], "file.jpg");
    const { getState } = renderWithRedux(
      <EditProfileModal opener={<div>Opener</div>} me={stubUser} />
    );
    userEvent.click(screen.getByText(/opener/i));
    expect(screen.getByText(/Edit your profile/i)).toBeInTheDocument();
    expect(getState().user.loadingState).toEqual(LoadingUserState.NEVER);

    const updateAvatarButton = screen.getByText(/Upload an Image/i);
    userEvent.click(updateAvatarButton);
    const fileInput = screen.getByTestId("avatarInput");
    expect(fileInput).toBeInTheDocument();
    userEvent.upload(fileInput, file);
    expect(getState().user.loadingState).toEqual(
      LoadingUserState.LOADINGUPDATE
    );
  });

  it("if user have avatar should dispatch update profile on remove photo button click", () => {
    const { getState } = renderWithRedux(
      <EditProfileModal opener={<div>Opener</div>} me={stubUser} />
    );
    userEvent.click(screen.getByText(/opener/i));
    expect(getState().user.loadingState).toEqual(LoadingUserState.NEVER);
    const removeAvatarButton = screen.getByRole("button", {
      name: /Remove photo/i,
    });
    userEvent.click(removeAvatarButton);
    expect(getState().user.loadingState).toEqual(
      LoadingUserState.LOADINGUPDATE
    );
  });

  it("dispatching update profile if correct form submitting", async () => {
    const { getState } = renderWithRedux(
      <EditProfileModal opener={<div>Opener</div>} me={stubUser} />
    );
    userEvent.click(screen.getByText(/opener/i));
    const nameInput = screen.getByPlaceholderText(/Full name/i);
    expect(nameInput).toHaveValue(stubUser.name);
    userEvent.type(nameInput, "123");
    expect(nameInput).toHaveValue(stubUser.name + "123");

    const displayNameInput = screen.getByPlaceholderText(/Display name/i);
    expect(displayNameInput).toHaveValue(stubUser.display_name);
    userEvent.type(displayNameInput, "Test-display-name");
    expect(displayNameInput).toHaveValue(
      stubUser.display_name + "Test-display-name"
    );

    const workInput = screen.getByPlaceholderText(/What I do/i);
    expect(workInput).toHaveValue("");
    userEvent.type(workInput, "Testing-work-field");
    expect(workInput).toHaveValue("Testing-work-field");

    const phoneInput = screen.getByLabelText(/Phone number/i);
    expect(phoneInput).toHaveValue("");
    userEvent.type(phoneInput, "111222333");
    expect(phoneInput).toHaveValue("111222333");

    const submitBtn = screen.getByRole("button", { name: /Save changes/i });
    expect(submitBtn).toBeInTheDocument();

    expect(getState().user.loadingState).toEqual("NEVER");
    await waitFor(() => userEvent.click(submitBtn));
    expect(getState().user.loadingState).toEqual(
      LoadingUserState.LOADINGUPDATE
    );
  });

  it("should show name field validation errors", async () => {
    renderWithRedux(
      <EditProfileModal opener={<div>Opener</div>} me={stubUser} />
    );
    userEvent.click(screen.getByText(/opener/i));

    const nameInput = screen.getByPlaceholderText(/Full name/i);
    expect(nameInput).toHaveValue(stubUser.name);
    userEvent.clear(nameInput);
    expect(nameInput).toHaveValue("");

    const submitBtn = screen.getByRole("button", { name: /Save changes/i });
    expect(submitBtn).toBeInTheDocument();
    await waitFor(() => userEvent.click(submitBtn));
    expect(
      await screen.findByText(/Name cannot be empty/i)
    ).toBeInTheDocument();

    userEvent.clear(nameInput);
    userEvent.type(nameInput, "T");
    expect(nameInput).toHaveValue("T");
    await waitFor(() => userEvent.click(submitBtn));
    expect(
      await screen.findByText(/Min name length is 2 characters/i)
    ).toBeInTheDocument();

    userEvent.clear(nameInput);
    userEvent.type(nameInput, "testtesttesttesttesttesttesttesttesttesttest");
    expect(nameInput).toHaveValue(
      "testtesttesttesttesttesttesttesttesttesttest"
    );
    await waitFor(() => userEvent.click(submitBtn));
    expect(
      await screen.findByText(/Max name length is 40 characters/i)
    ).toBeInTheDocument();
  });

  it("should show display_name field validation errors", async () => {
    renderWithRedux(
      <EditProfileModal opener={<div>Opener</div>} me={stubUser} />
    );
    userEvent.click(screen.getByText(/opener/i));

    const displayNameInput = screen.getByPlaceholderText(/Display name/i);
    expect(displayNameInput).toHaveValue(stubUser.display_name);
    userEvent.clear(displayNameInput);
    expect(displayNameInput).toHaveValue("");

    userEvent.type(displayNameInput, "T");
    const submitBtn = screen.getByRole("button", { name: /Save changes/i });
    expect(submitBtn).toBeInTheDocument();
    await waitFor(() => userEvent.click(submitBtn));
    expect(
      await screen.findByText(/Min display name length is 2 characters/i)
    ).toBeInTheDocument();

    userEvent.clear(displayNameInput);
    expect(displayNameInput).toHaveValue("");

    userEvent.type(
      displayNameInput,
      "testtesttesttesttesttesttesttesttesttesttest"
    );
    await waitFor(() => userEvent.click(submitBtn));
    expect(
      await screen.findByText(/Max name display length is 40 characters/i)
    ).toBeInTheDocument();
  });

  it("should show phone number field validation error", async () => {
    renderWithRedux(
      <EditProfileModal opener={<div>Opener</div>} me={stubUser} />
    );
    userEvent.click(screen.getByText(/opener/i));

    const phoneInput = screen.getByLabelText(/Phone number/i);
    expect(phoneInput).toHaveValue("");
    userEvent.type(phoneInput, "12345678910111214151617181920");
    expect(phoneInput).toHaveValue("12345678910111214151617181920");

    const submitBtn = screen.getByRole("button", { name: /Save changes/i });
    expect(submitBtn).toBeInTheDocument();
    await waitFor(() => userEvent.click(submitBtn));
    expect(
      await screen.findByText(/Max phone length is 15 digits/i)
    ).toBeInTheDocument();
  });
});
