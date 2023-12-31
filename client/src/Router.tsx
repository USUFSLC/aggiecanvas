import { Navigate, Route, Routes } from "react-router-dom";

import { useAggieCanvasClient } from "@/context/AggieCanvasClient";
import { useAuthContext } from "@/context/AuthContext";
import { Layout } from "@/Layout";
import { Grids } from "@/routes/Grids";
import { Grid } from "@/routes/Grid";
import { AggieLogin } from "@/routes/AggieLogin";
import { FourOhFour } from "@/routes/FourOhFour";

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

          <Route path="*" element={<FourOhFour />} />
        </Route>
      ) : (
        <Route path="/" element={<Layout theme="dark" />}>
          <Route path="*" element={<div aria-busy="true"></div>} />
        </Route>
      )}
    </Routes>
  );
};
