import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import FormPage from "./pages/FormPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ListPage />} />
        <Route path="/view/:id" element={<DetailPage />} />
        <Route path="/edit/:id" element={<FormPage />} />
        <Route path="/add" element={<FormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
