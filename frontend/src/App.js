import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Checkout from "./pages/Checkout";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const requiresLogin = Component => {
    return isSignedIn ? Component : <Navigate to="/login" />;
  };

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/checkout"
            element={<Checkout/> }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
