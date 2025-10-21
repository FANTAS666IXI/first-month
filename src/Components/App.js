import VersionWaterMark from "./VersionWaterMark";
import Carousel from "./Carousel/Carousel";
import AppProviders from "../Providers/AppProviders";
import LanguageFlag from "./LanguageFlag";

function App() {
  return (
    <AppProviders>
      <div className="app">
        <LanguageFlag />
        <Carousel />
        <VersionWaterMark />
      </div>
    </AppProviders>
  );
}

export default App;
