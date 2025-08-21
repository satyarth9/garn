import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Catalog  from "./pages/Catalog";
import Payment from "./pages/Payment";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/catalog" element={<Catalog/>}/>
        <Route path="/payment" element={<Payment/>}/>
      </Routes>
    </BrowserRouter>
    <div className="fixed bottom-5 right-5 z-50">
        <Chatbot/>
      </div>
    </>
  )
}

export default App
