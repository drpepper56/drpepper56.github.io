/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
import { useEffect, useState } from "react";
/*
      Element to dynamically generate more text input rows as needed
*/

// prompts for saving the state of inputs while this element is unmounted
interface DynamicIngredientsInputItems {
  values: string[];
  returnValues: (values: string[]) => void;
  label: string;
}

const DynamicIngredientsInput: React.FC<DynamicIngredientsInputItems> = ({
  values,
  returnValues,
  label,
}) => {
  // state to hold all current input values
  const [inputs, setInputs] = useState<string[]>([""]);

  /*
Cleanup and setup function
On mount set the inputs state to what was saved before,
On unmount run the passed function that saves the inputs
 */
  useEffect(() => {
    setInputs(values);
    return () => {};
  }, [returnValues(inputs)]);

  /*
Function to remove a single text input row
triggered by the button next to the text input
 */
  const handleRemoveInput = (buttonIndex: number) => {
    let newInputs = inputs.slice(0, buttonIndex);
    for (let i = buttonIndex + 1; i < inputs.length; i++) {
      newInputs.push(inputs[i]);
    }
    setInputs(newInputs);
  };

  /*
Handle the change of all input text boxes, when the last one is occupied by some text, add another one to the list
  */
  const handleLastIngInputValChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);

    if (
      // if last not empty
      index === newInputs.length - 1 &&
      event.target.value.trim() !== ""
    ) {
      setInputs([...newInputs, ""]);
    }
  };

  return (
    <>
      {/* render everything from the inputs state as a div>label,input */}
      {inputs.map((input, index) => {
        return (
          <div key={"div".concat(index.toString())} className="entry">
            <label className="label-entry">
              {label} {index + 1}{" "}
            </label>
            <input
              className="dynamic_inputs_input_text"
              onChange={(e) => handleLastIngInputValChange(index, e)}
              type="text"
              value={input}
              key={"text_input".concat(index.toString())}
            />
            {
              // button to remove the targeted text input
              // impenetrable logic
              (index > 0 || inputs.length > 0) &&
                (index < inputs.length - 1 ||
                  (index == 1 && inputs.length !== 2)) && (
                  <button
                    className="button-remove-entry"
                    onClick={() => handleRemoveInput(index)}
                  >
                    X
                  </button>
                )
            }
          </div>
        );
      })}
    </>
  );
};

export default DynamicIngredientsInput;
