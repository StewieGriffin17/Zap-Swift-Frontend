import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import "aos/dist/aos.css";
import Aos from "aos";

Aos.init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="min-h-screen">
      <div className="font-urbanis">
        <RouterProvider router={router} />
      </div>
    </div>
  </StrictMode>
);
