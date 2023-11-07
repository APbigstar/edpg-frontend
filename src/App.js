import React, { useMemo, useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

// Theme
import { themeSettings } from "theme";

// Scenes
import {
  Layout,
  Dashboard,
  Products,
  Users,
  Transactions,
  Questions,
  Overview,
  Daily,
  Monthly,
  Breakdown,
  Admins,
  Performance,
  About,
  Header,
  CourseHome,
  Team,
  Pricing,
  Blog,
  Contact,
  Footer,
  Home,
  ScrollButton,
  UserLoginPage,
  UserSignupPage,
  AdminLoginPage,
  AdminSignupPage,
} from "scenes";

// App
const App = () => {
  const navigate = useNavigate();
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const location = useLocation();
  const [isSignIn, setIsSignIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (
      location.pathname.includes("signin") ||
      location.pathname.includes("signup")
    ) {
      setIsSignIn(true);
    } else {
      setIsSignIn(false);
    }
    if (location.pathname.includes("admin")) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    // if (
    //   !location.pathname.includes("signup") &&
    //   location.pathname.includes("admin") &&
    //   !localStorage.getItem("admin-login-token")
    // ) {
    //   navigate("/admin/signin");
    // } else if (
    //   !location.pathname.includes("signup") &&
    //   !localStorage.getItem("login-token")
    // ) {
    //   navigate("/");
    // }
  }, [location.pathname]);

  return (
    <div className="app">
      <>
        {/* Theme Provider */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {!isSignIn && !isAdmin && <Header />}
          <Routes>
            <Route path="/admin/signin" element={<AdminLoginPage />} />
            <Route path="/admin/signup" element={<AdminSignupPage />} />
            <Route element={<Layout />}>
              <Route path="/admin" element={<Navigate to="/admin/signin" />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/transactions" element={<Transactions />} />
              <Route path="/admin/questions" element={<Questions />} />
              <Route path="/admin/overview" element={<Overview />} />
              <Route path="/admin/daily" element={<Daily />} />
              <Route path="/admin/monthly" element={<Monthly />} />
              <Route path="/admin/breakdown" element={<Breakdown />} />
              <Route path="/admin/admin" element={<Admins />} />
              <Route path="/admin/performance" element={<Performance />} />
            </Route>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/courses" element={<CourseHome />} />
            <Route exact path="/team" element={<Team />} />
            <Route exact path="/pricing" element={<Pricing />} />
            <Route exact path="/journal" element={<Blog />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route path="/signin" element={<UserLoginPage />} />
            <Route path="/signup" element={<UserSignupPage />} />
          </Routes>
          {!isSignIn && !isAdmin && <Footer />}
          <ScrollButton />
        </ThemeProvider>
      </>
    </div>
  );
};

export default App;
