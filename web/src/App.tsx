import { useEffect } from "react";
import { app, authenticate } from "./services/realm";

import { useAppDispatch } from "./store/hooks";
import { fetchArticles } from "./store/reducers/articles";
import { ArticlesPage } from "./components/pages/ArticlesPage";
import { AppShell } from "@mantine/core";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import AnalyticsPage from "./components/pages/AnalyticsPage";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    authenticate(app);
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <AppShell padding="md" navbar={<NavBar />} header={<Header />}>
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/feeds" element={<div>Feeds</div>} />
        <Route path="/feeds/:id" element={<div>Feed id</div>} />
      </Routes>
    </AppShell>
  );
};

export default App;
