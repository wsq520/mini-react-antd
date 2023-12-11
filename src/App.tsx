import React from "react";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";

function App() {
  return (
    <div className="App">
      <div>
        {" "}
        <Button>按钮</Button>
        <Button btnType='primary' size='lg'>
          按钮
        </Button>
        <Button
          btnType='link'
          size='sm'
          href="http://www.baidu.com"
        >
          链接按钮
        </Button>
      </div>
      <Menu defaultIndex={0} onSelect={(index) => console.log(index)}>
        <MenuItem index={0}>link</MenuItem>
        <MenuItem index={1}>link</MenuItem>
        <MenuItem index={2}>link</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
