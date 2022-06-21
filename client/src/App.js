import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RecoilRoot } from "recoil";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";
import ConfirmAlert from "./components/ConfirmAlert";
import "animate.css";

// For getting rid of the warning
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incomming) {
            return incomming;
          },
        },
        projects: {
          merge(existing, incomming) {
            return incomming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <Router>
          <Header />
          {/* Alert Portal */}
          <ConfirmAlert />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default App;
