import { BrowserRouter, Route, Routes } from "react-router";

import { StoreProvider, UIProvider } from "./components";
import { HomePage, SignInPage } from "./pages";

const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PageWrapper>
                <HomePage />
              </PageWrapper>
            }
          />
          <Route
            path="/sign-in"
            element={
              <PageWrapper>
                <SignInPage />
              </PageWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return <UIProvider>{children}</UIProvider>;
};

export default App;
