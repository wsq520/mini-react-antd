import React from "react";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";

function App() {
  return (
    <div className="App">
      <div>
        <Button>default</Button>
        <Button btnType="primary" size="lg">
          primary-large
        </Button>
        <Button btnType="danger">danger</Button>
        <Button
          btnType="link"
          size="sm"
          href="http://www.baidu.com"
          target="_blank"
        >
          baidu
        </Button>
      </div>
      <hr />
      <Menu onSelect={(index) => console.log(index)}>
        <MenuItem>home</MenuItem>
        <MenuItem>about</MenuItem>
        <MenuItem>mine</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown</MenuItem>
          <MenuItem>dropdown</MenuItem>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default App;
