import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./context/userContext";
import Auth from "./pages/Auth/Auth";
// User
import UserHome from "./pages/User/UserHome";
import UserProfile from "./pages/User/UserProfile";
import UserDetailProduct from "./pages/User/UserProductDetail";
// Admin
import AdminHome from "./pages/Admin/AdminHome";
import AdminAddProduct from "./pages/Admin/AdminAddProduct";
import AdminUpdateProduct from "./pages/Admin/AdminUpdateProduct";
import AdminCategory from "./pages/Admin/AdminCategory";
import AdminAddCategory from "./components/Admin/AddCategory";
import AdminUpdateCategory from "./pages/Admin/AdminUpdateCategory";
import { API, setAuthToken } from "./config/api";

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  // console.clear();
  console.log(state);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/auth");
    } else {
      if (state.user.status === "admin") {
        navigate("/admin");
      } else if (state.user.status === "customer") {
        navigate("/");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      console.log(response);

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route exact path="/" element={<UserHome />} /> 
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/user/product-detail/:id" element={<UserDetailProduct />} />

      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/add-product" element={<AdminAddProduct />} />
      <Route path="/admin/update-product/:id" element={<AdminUpdateProduct />} />
      <Route path="/admin/category" element={<AdminCategory />} />
      <Route path="/admin/add-category" element={<AdminAddCategory />} />
      <Route path="/admin/update-category/:id" element={<AdminUpdateCategory />} />
    </Routes>
  );
}

export default App;
