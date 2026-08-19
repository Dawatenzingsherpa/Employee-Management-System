import { Route, Routes, BrowserRouter } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import SignInForm from "./pages/AuthPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
