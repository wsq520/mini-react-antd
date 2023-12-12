import { render, screen, RenderResult } from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: "horizontal",
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>hhh</MenuItem>
    </Menu>
  );
};

const func = (index: number) => {
  console.log("MenuItem-index:", index);
};

let wrapper: RenderResult,
  menuElment: HTMLElement,
  activeElement: HTMLElement,
  disabledElment: HTMLElement;

describe("test Menu and MenuItem cpn", () => {
  wrapper = render(generateMenu(testProps));
  menuElment = screen.getByTestId("test-menu");
  activeElement = screen.getByText("active");
  disabledElment = screen.getByText("disabled");

  it("render Menu and MenuItem with defaultProps", () => {
    expect(menuElment).toBeInTheDocument();
    expect(menuElment).toHaveClass("my-menu test");
    const { container } = wrapper;
    // expect(container.querySelector("ul")?.querySelectorAll('li').length).toEqual(3);
  });
});
