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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect } from "react";
import Input from "../Input/input";
import useDebounce from "../../hooks/useDebounce";
export var AutoCompelete = function (props) {
    var fetchSugguestions = props.fetchSugguestions, onSelect = props.onSelect, value = props.value, renderOptions = props.renderOptions, restProps = __rest(props, ["fetchSugguestions", "onSelect", "value", "renderOptions"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var debouncedValue = useDebounce(inputValue);
    useEffect(function () {
        if (debouncedValue) {
            var results = fetchSugguestions(debouncedValue);
            if (results instanceof Promise) {
                results.then(function (res) {
                    setSuggestions(res);
                });
            }
            else {
                setSuggestions(results);
            }
        }
        else {
            setSuggestions([]);
        }
    }, [debouncedValue, fetchSugguestions]);
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
    };
    var renderTemplate = function (item) {
        return renderOptions ? renderOptions(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement("ul", null, suggestions.map(function (item, index) {
            return (React.createElement("li", { key: index, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
        })));
    };
    return (React.createElement("div", { className: "antd-auto-complete" },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange }, restProps)),
        suggestions.length > 0 && generateDropdown()));
};
export default AutoCompelete;
