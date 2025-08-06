// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./Home";
import Contact from "./Contact";
import Crew from "./Crew";
import Mission from "./Mission";
import Models from "./Models"

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/crew" element={<Crew />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/models" element={<Models />} />
        {/* <Route path="/mission" element={<Mission />} />
        <Route path="/crew" element={<Crew />} />
        
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
