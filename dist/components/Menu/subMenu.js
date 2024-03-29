var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
var SubMenu = function (props) {
    var index = props.index, title = props.title, className = props.className, children = props.children;
    var context = useContext(MenuContext);
    var openedSubMenus = context.defaultOpenSubMenus;
    var isOpened = index && context.mode === "vertical"
        ? openedSubMenus.includes(index)
        : false;
    // 设置子菜单是否展开
    var _a = useState(isOpened), menuOpen = _a[0], setOpen = _a[1];
    var classes = classNames("menu-item submenu-item", className, {
        "is-active": context.index === index,
        "is-opened": menuOpen,
        "is-vertical": context.mode === "vertical",
    });
    // console.log("subMenu-menuOpen:", menuOpen);
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    // let timer: any;
    var handleMouse = function (e, toggle) {
        // clearTimeout(timer);
        e.preventDefault();
        setOpen(toggle);
        // timer = setTimeout(() => {
        //   setOpen(toggle);
        // }, 300);
    };
    var clickEvents = context.mode === "vertical"
        ? {
            onClick: handleClick,
        }
        : {};
    var hoverEvents = context.mode !== "vertical"
        ? {
            onMouseEnter: function (e) {
                handleMouse(e, true);
            },
            onMouseLeave: function (e) {
                handleMouse(e, false);
            },
        }
        : {};
    var renderChildren = function () {
        var subMenuClasses = classNames("antd-submenu", {
            "menu-opened": menuOpen,
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === "MenuItem") {
                var subMenuItem_index = "".concat(index, "-").concat(i);
                return React.cloneElement(childElement, { index: subMenuItem_index });
            }
            else {
                console.error("Warning: Menu has a children which is not a MenuItem");
            }
        });
        return (React.createElement(Transition, { in: menuOpen, timeout: 300, animation: "zoom-in-bottom" },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents),
            title,
            React.createElement(Icon, { icon: "angle-down", className: "arrow-icon" })),
        renderChildren()));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
