import React, { useContext, useState, FunctionComponentElement } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props;
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened =
    (index && context.mode === "vertical")
      ? openedSubMenus.includes(index)
      : false;

  // 设置子菜单是否展开
  const [menuOpen, setOpen] = useState(isOpened);

  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === 'vertical'
  });
  // console.log("subMenu-menuOpen:", menuOpen);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };

  // let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    // clearTimeout(timer);
    e.preventDefault();
    setOpen(toggle);
    // timer = setTimeout(() => {
    //   setOpen(toggle);
    // }, 300);
  };

  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};

  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};

  const renderChildren = () => {
    const subMenuClasses = classNames("viking-submenu", {
      "menu-opened": menuOpen,
    });

    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        const subMenuItem_index = `${index}-${i}`;
        return React.cloneElement(childElement, { index: subMenuItem_index });
      } else {
        console.error("Warning: Menu has a children which is not a MenuItem");
      }
    });

    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
