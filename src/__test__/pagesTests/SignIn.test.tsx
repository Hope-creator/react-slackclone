import { SignIn } from "../../pages/SignIn";
import { MemoryRouter } from "react-router-dom";
import { renderWithRedux } from "../utils/renderWithRedux";

describe("GetStarted page tests", () => {
  it("should current render component", () => {
    const { asFragment } = renderWithRedux(
      <MemoryRouter initialEntries={["/signin"]}>
        <SignIn />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
