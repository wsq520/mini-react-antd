import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button, { ButtonProps, ButtonType, ButtionSize } from "./button";

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtionSize.Small,
  className: "klass",
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

test("button render test", () => {
  render(<Button>button</Button>);
  const element = screen.queryByText("button");
  expect(element).toBeTruthy();
  expect(element).toBeInTheDocument();
});

describe("button component test", () => {
  it("should render default button", () => {
    render(<Button>button</Button>);
    const element = screen.queryByText("button");
    expect(element).toBeInTheDocument();
    if(!element) throw new Error("element is null");
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
  });
  
  it("should render button based on different props", () => {
    render(<Button {...testProps}>Nice</Button>);
    const element = screen.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-sm klass');
  });

  it("should render link button", () => {
    render(<Button btnType="link" href="http://www.baidu.com">Link</Button>)
    const element = screen.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  });

  it('should render disabled button when disabled set to true', () => {
    render(<Button {...disabledProps}>Nice</Button>)
    const element = screen.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
});
