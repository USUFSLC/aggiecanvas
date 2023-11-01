import { Navigate, Route, Routes } from "react-router-dom";

import { useAggieCanvasClient } from "@/context/AggieCanvasClient";
import { useAuthContext } from "@/context/AuthContext";
import { Layout } from "@/Layout";
import { Grids } from "@/routes/Grids";
import { Grid } from "@/routes/Grid";
import { AggieLogin } from "./routes/AggieLogin";

export const Router = () => {
  const { user } = useAuthContext();
  const { client } = useAggieCanvasClient();

  return (
    <Routes>
      {client! ? (
        <Route path="/" element={<Layout theme="dark" />}>
          <Route
            path=""
            element={user ? <Navigate to="/grids" replace /> : <AggieLogin />}
          />

          <Route path="grids" element={<Grids />} />
          <Route path="grid/:id" element={<Grid />} />
        </Route>
      ) : (
        <Route path="/" element={<Layout theme="dark" />}>
          <Route path="*" element={<h1>Loading...</h1>} />
        </Route>
      )}
    </Routes>
  );
};
