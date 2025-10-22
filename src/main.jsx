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
    <div className="min-h-screen bg-gray-100">
      <div className="font-urbanist max-w-[1500px] mx-auto pt-1 sm:pt-2 ">
        <RouterProvider router={router} />
      </div>
    </div>
  </StrictMode>
);
