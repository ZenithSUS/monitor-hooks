import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import { Requirements } from "./pages/requirements";
import AddRequirementForm from "./pages/add";
import UpdateRequirementForm from "./pages/edit";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Requirements />} />
            <Route path="/add" element={<AddRequirementForm />} />
            <Route path="/edit/:id" element={<UpdateRequirementForm />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
