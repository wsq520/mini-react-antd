import React, { FC, useState, useEffect, ChangeEvent, ReactElement } from "react";
import Input, { InputProps } from "../Input/input";
import useDebounce from "../../hooks/useDebounce";

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompeleteProps extends Omit<InputProps, "onSelect"> {
  fetchSugguestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOptions?: (item: DataSourceType) => ReactElement;
}

export const AutoCompelete: FC<AutoCompeleteProps> = (props) => {
  const { fetchSugguestions, onSelect, value, renderOptions, ...restProps } =
    props;

  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const debouncedValue = useDebounce(inputValue);

  useEffect(() => {
    if (debouncedValue) {
      const results = fetchSugguestions(debouncedValue as string);
      if (results instanceof Promise) {
        results.then((res) => {
          setSuggestions(res);
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
  }, [debouncedValue, fetchSugguestions]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
  };

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOptions ? renderOptions(item) : item.value;
  };

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="antd-auto-complete">
      <Input
        value={inputValue}
        onChange={handleChange}
        // onKeyDown={handleKeyDown}
        {...restProps}
      />
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};

export default AutoCompelete;
