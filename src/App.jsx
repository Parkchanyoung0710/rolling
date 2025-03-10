import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar.core";
import HomePage from "./pages/Home/HomePage";
import RollingPaperListPage from "./pages/RollingPaperList/RollingPaperListPage";
import CreateRollingPaperPage from "./pages/CreateRollingPaper/CreateRollingPaperPage";
import RollingPaperPage from "./pages/RollingPaper/RollingPaperPage";
import MessagePage from "./pages/Message/MessagePage";


function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<RollingPaperListPage />} />
        <Route path="/post" element={<CreateRollingPaperPage />} />
        <Route path="/post1" element={<RollingPaperPage />} />
        <Route path="/post1/message" element={<MessagePage />} />
      </Routes>
    </>
  );
}

export default App;
