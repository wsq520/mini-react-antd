import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from 'classnames';
import Icon from "../Icon/icon";

type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  onChange? : (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = (props) => {
  const { style, disabled, size, icon, prepend, append, onChange, ...restProps } = props;

  const cnames = classNames('antd-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })

  // 解决使用useState()不传参数的报错问题
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  
  // 解决初始时 设置了默认值报错问题（defaultValue和 value不应该同时存在 否则组件变成非受控组件）
  if('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  return (
    <div className={cnames} style={style}>
      {prepend && <div className="antd-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input 
        className="antd-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="antd-input-group-append">{append}</div>}
    </div>
  )
}

export default Input;