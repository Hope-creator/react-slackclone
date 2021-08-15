import { Company } from "../../pages/Company";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { setUser } from "../../store/modules/user/user";
import { renderWithRedux } from "../utils/renderWithRedux";
import { fakeUser } from "../utils/fakes";

describe("Company page tests", () => {
  it("should render component if user passed", () => {
    const { dispatch } = renderWithRedux(
      <MemoryRouter initialEntries={["/"]}>
        <Company />
      </MemoryRouter>
    );
    expect(screen.queryByText(/Navigation/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Workspace/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Info/i)).not.toBeInTheDocument();
    dispatch(setUser(fakeUser));
    expect(screen.queryByText(/Navigation/i)).toBeInTheDocument();
    expect(screen.queryByText(/Workspace/i)).toBeInTheDocument();
    expect(screen.queryByText(/Info/i)).toBeInTheDocument();
  });
});
