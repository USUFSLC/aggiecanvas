import React, { useContext, useState, createContext } from "react";
import OpenAPIClientAxios from "openapi-client-axios";
import { Client as AggieCanvasClient } from "@/aggiecanvas-openapi";

export interface clientContext {
  client: AggieCanvasClient;
  clientInitializer: Promise<AggieCanvasClient>;
}

const AggieCanvasClientContext = createContext<clientContext>(
  {} as clientContext
);

export const useAggieCanvasClient = () => useContext(AggieCanvasClientContext);

const apiRoute = window.location.origin + "/api";
const openApiDefinition = apiRoute + "/swagger/json";
const api = new OpenAPIClientAxios({
  definition: openApiDefinition,
  withServer: 0,
  axiosConfigDefaults: {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-cache",
    },
  },
});
api.withServer({ url: apiRoute });

const promise = api.init<AggieCanvasClient>();

export const AggieClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [aggieCanvasClient, setAggieCanvasClient] =
    useState<AggieCanvasClient>();
  const [aggieCanvasClientInitializer] = useState<Promise<AggieCanvasClient>>(
    new Promise((res) => {
      promise.then((client) => {
        setAggieCanvasClient(() => {
          res(client);
          return client;
        });
      });
    })
  );

  return (
    <AggieCanvasClientContext.Provider
      value={{
        client: aggieCanvasClient as AggieCanvasClient,
        clientInitializer: aggieCanvasClientInitializer,
      }}
    >
      {children}
    </AggieCanvasClientContext.Provider>
  );
};
