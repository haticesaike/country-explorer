import { useAtom } from "jotai";
import { selectedItemAtom } from "../jotai/atoms";
import "../css/selectItem.css";
import Flag from "react-world-flags";
function SelectItem() {
  const [selectedItem] = useAtom(selectedItemAtom);
  return selectedItem ? (
    <div className="select-container">
      <div className="flag">
        <Flag code={selectedItem?.code} />
      </div>

      <div className="info">
        <h2>{selectedItem?.name}</h2>

        <p> Capital:{selectedItem?.capital}</p>
        <p>Currency:{selectedItem?.currency}</p>
        <p>Continent:{selectedItem?.continent?.name}</p>
      </div>
    </div>
  ) : (
    <div className="info center">Please Select Country</div>
  );
}

export default SelectItem;
