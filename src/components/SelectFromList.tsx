import "../css/select_from_list.css";
import { useEffect, useState } from "react";
import { Allergies } from "./RecipeControl";
/*
      Element to display a list of string to chose multiple options
      Used for choosing allergies
*/

// prompts for saving the state of inputs while this element is unmounted
interface SelectFromListItems {
  // values chosen from before
  values: string[];
  // enum list to chose from
  allAllergies: (Allergies | string)[];
  // pass the values back to save the inputs when the component is unmounted
  returnValues: (values: string[]) => void;
  // how to label this select element
  label: string;
}

const SelectFromList: React.FC<SelectFromListItems> = ({
  values,
  returnValues,
  label,
  allAllergies,
}) => {
  // state to hold all current input values
  const [listValues, setListValues] = useState<string[]>([""]);

  /*
  Cleanup and setup function
  On mount set the inputs state to what was saved before,
  On unmount run the passed function that saves the inputs
   */
  useEffect(() => {
    setListValues(values);
    return () => {};
  }, [returnValues(listValues)]);

  /*
  Handle adding and removing allergies
   */
  const handleToggleAllergy = (value: string) => {
    if (listValues.includes(value)) {
      // if already in the list then remove
      let tmp = Array.from(listValues).filter(function (e) {
        return e !== value;
      });
      setListValues(tmp);
    } else {
      // if it doesn't have it, add it
      let tmp = Array.from(listValues);
      tmp.push(value);
      setListValues(tmp);
    }
  };

  return (
    <div id={label} key={"select_" + label} className="select-container">
      {allAllergies.map((value) => {
        return (
          <div
            key={value}
            onClick={() => handleToggleAllergy(value.toString())}
            className="allergy-option"
          >
            {listValues.includes(value.toString()) && (
              <div className="check-mark">✓</div>
            )}
            <p className="option-text">{value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SelectFromList;
