import { useAtom } from "jotai";
import { selectedItemAtom } from "../jotai/atoms";
import "../css/selectItem.css";
function SelectItem() {
  const [selectedItem] = useAtom(selectedItemAtom);
  return (
    <div>
      <div className="select">
        <div className="card">
          <div className="image">
            <img
              width={150}
              height={150}
              src={`https://raw.githubusercontent.com/onramper/small-open-datasets/master/rendered-country-flags/flags/${selectedItem?.code}.png`}
              alt={selectedItem?.code}
            />
          </div>
        </div>

        <h2>{selectedItem?.name}</h2>
      </div>
    </div>
  );
}

export default SelectItem;
