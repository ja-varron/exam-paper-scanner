import { BrowserRouter, Route, Routes } from "react-router-dom"
import ScannerPage from "./pages/ScannerPage"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScannerPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
