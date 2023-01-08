import { Routes, Route } from "react-router-dom";

import PapersPage from "./pages/PapersPage.jsx";
import PapersForm from "./pages/PapersForm.jsx";
import NotFound from "./pages/NotFound.jsx";

import Navbar from "./components/Navbar.jsx";

import { PaperContextProvider } from "./context/paperContext.jsx";

const App = () => {
  return (
    <div className="bg-zinc-900">
      <Navbar />
      <div className="container mx-auto py-4 px-10">
        <PaperContextProvider>
          <Routes>
            <Route path="/" element={<PapersPage />} />
            <Route path="/new" element={<PapersForm />} />
            <Route path="/edit/:doi" element={<PapersForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PaperContextProvider>
      </div>
    </div>
  );
};

export default App;
