import ReactDOM from "react-dom/client";
import "@picocss/pico";

import { BrowserRouter } from "react-router-dom";
import { Router } from "@/Router";

import { AuthProvider } from "@/context/AuthContext";
import { AggieClientProvider } from "@/context/AggieCanvasClient";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AggieClientProvider>
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  </AggieClientProvider>
);
