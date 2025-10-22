import VersionWaterMark from "./VersionWaterMark";
import Carousel from "./Carousel/Carousel";
import AppProviders from "../Providers/AppProviders";
import LanguageFlag from "./LanguageFlag";
import BackgroundMusic from "./BackgroundMusic";

function App() {
  return (
    <AppProviders>
      <div className="app">
        <BackgroundMusic />
        <LanguageFlag />
        <Carousel />
        <VersionWaterMark />
      </div>
    </AppProviders>
  );
}

export default App;
