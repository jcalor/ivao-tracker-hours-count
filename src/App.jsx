import { useEffect } from "react";
import MainPage from "./pages/MainPage";
import ReactGA from "react-ga4";

ReactGA.initialize("G-DP6QS1MWZ0");

function App() {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search, title: "Home Page" });
  }, []);
  
  return (
    <div className="container mx-auto">
      <MainPage />
    </div>
  );
}

export default App;
