import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { GHColumns, userColumns ,roomColumns} from "./datatablesource";
import NewGuesthouse from "./pages/new guesthouse/NewGuestHouse";
import NewRoom from "./pages/new room/NewRoom";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Navigate to="/users" />} />
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route path="users">
              <Route index element={ <ProtectedRoute>
                  <List columns={userColumns}/>
                </ProtectedRoute>} />
              <Route path=":userId" element={
               <ProtectedRoute>
                  <Single />
                </ProtectedRoute>} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="guesthouses">
              <Route index element={
               <ProtectedRoute>
                  <List columns={GHColumns}/>
                </ProtectedRoute>} />
              <Route path=":productId" element={
               <ProtectedRoute>
                  <Single />
                </ProtectedRoute>} />
              <Route
                path="new"
                element={<NewGuesthouse/>}
              />
            </Route>
            <Route path="rooms">
              <Route index element={
               <ProtectedRoute>
                  <List columns={roomColumns}/>
                </ProtectedRoute>} />
              <Route path=":productId" element={
               <ProtectedRoute>
                  <Single />
                </ProtectedRoute>} />
              <Route
                path="new"
                element={<NewRoom />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
