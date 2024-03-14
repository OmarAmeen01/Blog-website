import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import authService from "./appwrite services/auth";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components/bridge";
function App() {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !isLoading ? (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}

export default App;
