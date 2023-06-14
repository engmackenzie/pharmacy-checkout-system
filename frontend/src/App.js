import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Checkout from "./pages/Checkout";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const requiresLogin = Component => {
    return isSignedIn ? Component : <Navigate to="/login" />;
  };

  const onLogin = () => {
    setIsSignedIn(true);
  };

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage onLogin={onLogin}/> }
          />
          <Route
            path="/checkout"
            element={requiresLogin(<Checkout setIsSignedIn={setIsSignedIn}/>) }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
