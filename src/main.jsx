import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
// import 'react-date-range/dist/styles.css'
// import 'react-date-range/dist/theme/default.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from './Router/Router.jsx';
import AuthProviders from './Providers/AuthProviders.jsx';

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviders>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={Router} />
        </QueryClientProvider>
        <Toaster position='top-right' reverseOrder={false} />
      </HelmetProvider>
    </AuthProviders>
  </StrictMode>
)
