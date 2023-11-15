import { createBrowserRouter } from "react-router-dom";
import {
  Auth,
  Categories,
  ErrorPage,
  Home,
  Layout,
  Transactions,
} from "../pages";
import { ProtectedRoute } from "../components";
import { categoriesAction, categoryLoader } from "../pages/Categories";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "transactions",
        element: (
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        action: categoriesAction,
        loader: categoryLoader,
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "auth",
        element: <Auth />,
      },
    ],
  },
]);
