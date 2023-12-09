import React from "react";
import Button, { ButtonType, ButtionSize } from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <Button>按钮</Button>
      <Button btnType={ButtonType.Primary} size={ButtionSize.Large}>
        按钮
      </Button>
      <Button btnType={ButtonType.Link} size={ButtionSize.Small} href="http://www.baidu.com">
        链接按钮
      </Button>
    </div>
  );
}

export default App;
