import React from "react";
import GradationComponent from "./GradationComponent";
import Style from "./app.module.css";

function App() {
  const wrapperWidthPer = 95;
  return (
    <body
      className={Style.wrapper}
      style={{
        width: wrapperWidthPer + "%",
      }}
    >
      <header className={Style.header}>
        <h1>Gradation Maker</h1>
      </header>
      <main className="main">
        <GradationComponent wrapperWidthPer={wrapperWidthPer} />
      </main>
      <footer className={Style.footer}>
        <a
          className="App-link"
          href="https://yamyamtamtam.tech/"
          target="_blank"
          rel="noopener noreferrer"
        >
          My blog.
        </a>
        <h6>yamyamtamtam All right reserved.</h6>
      </footer>
    </body>
  );
}

export default App;
