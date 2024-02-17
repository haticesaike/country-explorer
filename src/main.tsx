import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./api/apolloClient";
import { Provider as JotaiProvider } from "jotai";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <JotaiProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </JotaiProvider>,
);
