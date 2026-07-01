import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Pets from "./pages/Pets";
import Sitters from "./pages/Sitters";
import Tips from "./pages/Tips";
import Helplines from "./pages/Helplines";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddPet from "./pages/AddPet";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/sitters" element={<Sitters />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/helplines" element={<Helplines />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-pet" element={<AddPet />} />
      </Routes>
    </div>
  );
}

export default App;