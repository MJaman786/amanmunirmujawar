import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./routes/routeConfig";
import NotFound from "./components/PageNotFound/NotFound";

export default function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* </Route> */}
          {
            AppRoutes.map((route) => {
              // public routes
              if (!route.isPrivate) {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                )
              }
            })
          }
          {/* No Route Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
