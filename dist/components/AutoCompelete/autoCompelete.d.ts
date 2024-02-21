import { FC, ReactElement } from "react";
import { InputProps } from "../Input/input";
interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompeleteProps extends Omit<InputProps, "onSelect"> {
    fetchSugguestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOptions?: (item: DataSourceType) => ReactElement;
}
export declare const AutoCompelete: FC<AutoCompeleteProps>;
export default AutoCompelete;
