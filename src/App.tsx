import React from "react";
import "./App.css";
import VideoWithMessage from "./VideoWithMessage"; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <VideoWithMessage videoSrc="abc.mp4" />
      </header>
    </div>
  );
}

export default App;
