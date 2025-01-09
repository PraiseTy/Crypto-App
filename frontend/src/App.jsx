import SignUp from "./SignUp/SignUp";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LogIn from "./LogIn/LogIn";
import Menu from "./Menu/Menu";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
