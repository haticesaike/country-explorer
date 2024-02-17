import "./App.css";
import CountriesList from "./components/CountriesList";
import SelectItem from "./components/SelectItem";

function App() {
  return (
    <div>
      <h2>Countries Explorer</h2>

      <div className="App">
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
