import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/ui/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<div style={{ height: "2000px" }}>Home</div>} />
          <Route path="/services" element={<div>srevices</div>} />
          <Route path="/customsoftware" element={<div>customsoftware</div>} />
          <Route path="/mobileapps" element={<div>mobileapps</div>} />
          <Route path="/websites" element={<div>websites</div>} />
          <Route path="/revolution" element={<div>revolution</div>} />
          <Route path="/about" element={<div>about</div>} />
          <Route path="/contact" element={<div>contact</div>} />
          <Route path="/estimate" element={<div>estimate</div>} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
