import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import RequestForm from "./pages/RequestForm.tsx";
import Feedback from "./pages/Feedback.tsx";
import Status from "./pages/CheckStatus.tsx";
import Login from "./pages/Login.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/request' element={<RequestForm />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/status' element={<Status />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
