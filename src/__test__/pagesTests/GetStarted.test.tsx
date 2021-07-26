import { GetStarted } from "../../pages/GetStarted";
import { renderWithRedux } from "../utils/renderWithRedux";

describe("GetStarted page tests", () => {
  it("should current render component", () => {
    const { asFragment } = renderWithRedux(<GetStarted />);
    expect(asFragment()).toMatchSnapshot();
  });
});
