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
import { transactionAction, transactionLoader } from "../pages/Transactions";

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
        action: transactionAction,
        loader: transactionLoader,
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
