import { useEffect } from "react";
import { app, authenticate } from "./services/realm";

import { useAppDispatch } from "./store/hooks";
import { fetchArticles } from "./store/reducers/articles";
import { ArticlesPage } from "./components/pages/ArticlesPage";
import { AppShell } from "@mantine/core";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import { createBrowserRouter, createHashRouter, Route, RouterProvider, Routes } from "react-router-dom";
import AnalyticsPage from "./components/pages/AnalyticsPage";
import RootDashboard from "./components/pages/RootDashboard";
import FeedPage from "./components/pages/FeedPage";


const router = createHashRouter([{
  path: "/",
  element: <RootDashboard />,
  children: [
    {
      index: true,
      element: <ArticlesPage />
    },
    {
      path: "analytics",
      element: <AnalyticsPage />
    },
    {
      path: "feeds",
      element: <div>Feeds</div>,
      children: [
        {
          path: ":id",
          element: <FeedPage/>
        }
      ]
    }
  ]
}])

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    authenticate(app);
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <RouterProvider router={router}/>
  );
};

export default App;
