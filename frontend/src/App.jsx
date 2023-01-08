import { Routes, Route } from "react-router-dom";

import PapersPage from "./pages/PapersPage.jsx";
import PapersForm from "./pages/PapersForm.jsx";
import NotFound from "./pages/NotFound.jsx";

import Navbar from "./components/Navbar.jsx";

import { PaperContextProvider } from "./context/paperContext.jsx";

const App = () => {
  return (
    <PaperContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<PapersPage />} />
        <Route path="/new" element={<PapersForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PaperContextProvider>
  );
};

export default App;
