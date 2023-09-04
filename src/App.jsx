import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Admin, Analytics, Dashboard, Home, Landing } from "./pages";
import { useState } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
const App = () => {
  const [user, setUser] = useState(null);

  const login = () => {
    setUser({
      id: 1,
      name: "juan",
      permissions: [""],
    });
  };

  const logout = () => setUser(null);

  return (
    <BrowserRouter>
      <Navegation></Navegation>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
      <Routes>
        <Route index element={<Landing />} />
        <Route path='/landing' element={<Landing />} />

        <Route
          element={<ProtectedRoute isAllowed={!!user} redirectTo='/landing' />}
        >
          <Route path='/home' element={<Home />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Route>

        <Route
          path='/analytics'
          element={
            <ProtectedRoute
              isAllowed={!!user && user.permissions.includes("analize")}
              redirectTo='/home'
            >
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route path='/admin' element={<Admin />} />

        {/* <Route
          path='/home'
          element={
            <ProtectedRoute user={user} redirectTo='/'>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute user={user} redirectTo="/">
              
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

const Navegation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/landing'>Landing</Link>
        </li>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        <li>
          <Link to='/analytics'>Analytics</Link>
        </li>
        <li>
          <Link to='/admin'>Admin</Link>
        </li>
      </ul>
    </nav>
  );
};

export default App;
