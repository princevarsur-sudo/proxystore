import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import ListingDetails from "./pages/ListingDetails";
import MyListings from "./pages/MyListings";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/my-listings" element={<MyListings />} />
      </Routes>
    </BrowserRouter>
  );
}
