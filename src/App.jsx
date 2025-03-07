import React from "react";
import { formatDate } from "./utils/datetime";
function App() {
  const isoDate = "2025-03-07T12:34:56Z"; //예시 시간 설정

  return (
    <>
      <h1>Rolling 시작!</h1>
      <h2>{formatDate(isoDate)}</h2>
    </>
  );
}

export default App;
