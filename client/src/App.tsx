import { Outlet, useLocation } from "react-router-dom"
import { UserProvider } from "./providers/UserProvider"
import { ToastContainer } from "react-toastify"
import Navbar from "./components/Shared/Navbar"
import Footer from "./components/Shared/Footer";

const App = () => {
  const location = useLocation();
  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <>
      <UserProvider>
          {showNavbar && <Navbar />}
          <Outlet />
          <ToastContainer />
          {showNavbar && <Footer />}
      </UserProvider>
    </>
  );
};

export default App;
