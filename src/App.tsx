import "./App.css";
import CountriesList from "./components/CountriesList";
import SelectItem from "./components/SelectItem";

function App() {
  return (
    <div className="App">
      <p className="title">Countries Explorer</p>
      <div className="container">
        <div className="countriesList">
          <CountriesList />
        </div>
        <div className="selectedItem">
          <SelectItem />
        </div>
      </div>
    </div>
  );
}

export default App;
