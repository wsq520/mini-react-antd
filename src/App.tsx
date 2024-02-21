// import React from "react";
import Button from "./components/Button/button";
// import Menu from "./components/Menu/menu";
// import MenuItem from "./components/Menu/menuItem";
// import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
// import Input from "./components/Input";
import Upload from "./components/Upload/upload";

function App() {
  const onSuccess = (data: any, file: File) => {
    console.log("onSuceess:", data, file);
  };
  const onError = (data: any, file: File) => {
    console.log("onError:", data, file);
  };
  const checkFileSize = (file: File) => {
    // if (Math.round(file.size / 1024) > 50) {
    //   alert("file too big");
    //   return false;
    // }
    return true;
  };

  return (
    <div className="App">
      {/* <div>
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
      <hr />
      <Input></Input>
      <Input disabled></Input>
      <Input placeholder="请输入密码"></Input>
      <Input placeholder="请输入地址" prepend="https://" size="sm"></Input>
      <hr /> */}
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        onSuccess={onSuccess}
        onError={onError}
        // beforeUpload={checkFileSize}
        // name="fileName"
        // data={{ key: "value" }}
        drag={true}
      >
        {/* <Button btnType="primary">upload file</Button> */}
        <Icon icon="upload" size="5x" theme="secondary" />
        <br />
        <p>Drag file over to upload</p>
      </Upload>
    </div>
  );
}

export default App;
