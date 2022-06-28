import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SpotifyHandler from "./hooks/SpotifyHandler";
import MainComponent from "./components/Main";
import AuthComponent from "./components/Auth";

function App() {
  const [spotifyHandler] = useState<ISpotifyHandler>(new SpotifyHandler());

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MainComponent spotifyHandler={spotifyHandler} />}
        />
        <Route
          path="/auth"
          element={<AuthComponent spotifyHandler={spotifyHandler} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
