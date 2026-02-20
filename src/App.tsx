import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Marketplace from "./pages/Marketplace";
import ListingDetails from "./pages/ListingDetails";
import Chat from "./pages/Chat";
import MyListings from "./pages/MyListings";
import Inbox from "./pages/Inbox";

function App() {
  return (
    <Router>
      <Routes>

        {/* Pages WITH Navbar */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/mylistings" element={<MyListings />} />
          <Route path="/inbox" element={<Inbox />} />
        </Route>

        {/* Auth Page WITHOUT Navbar */}
        <Route path="/auth" element={<Auth />} />

      </Routes>
    </Router>
  );
}

export default App;