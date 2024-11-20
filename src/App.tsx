import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CreateCampaign } from './pages/CreateCampaign';
import { ViewCampaign } from './pages/ViewCampaign';
import { Dashboard } from './pages/Dashboard';
import { Auth } from './pages/Auth';
import { ProtectedRoute } from './components/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="create-campaign"
              element={
                <ProtectedRoute>
                  <CreateCampaign />
                </ProtectedRoute>
              }
            />
            <Route
              path="campaign/:id"
              element={
                <ProtectedRoute>
                  <ViewCampaign />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;