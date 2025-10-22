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
      </div>
    </AppProviders>
  );
}

export default App;
