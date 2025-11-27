import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LandingPage } from "./pages/LandingPage";
import { AboutPage } from "./pages/AboutPage";
import { PricingPage } from "./pages/PricingPage";
import { ContactsPage } from "./pages/ContactsPage";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}
