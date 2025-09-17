import { Outlet, useLocation } from "react-router-dom"
import { UserProvider } from "./providers/UserProvider"
import { ToastContainer } from "react-toastify"
import Navbar from "./components/Shared/Navbar"

const App = () => {
  const location = useLocation();
  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <>
      <UserProvider>
          {showNavbar && <Navbar />}
          <Outlet />
          <ToastContainer />
      </UserProvider>
    </>
  );
};

export default App;
