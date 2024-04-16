import { useEffect, useRef, useState } from "react";

interface DynamicIngredientsInputItems {
  values: string[];
  returnValues: (values: string[]) => void;
}

const DynamicIngredientsInput: React.FC<DynamicIngredientsInputItems> = ({
  values,
  returnValues,
}) => {
  const [inputs, setInputs] = useState<string[]>([""]);

  useEffect(() => {
    // Action to be executed once on component mount;
    setInputs(values);
    return () => {};
  }, [returnValues(inputs)]);

  const handleRemoveInput = (buttonIndex: number) => {
    let newInputs = inputs.slice(0, buttonIndex);
    for (let i = buttonIndex + 1; i < inputs.length; i++) {
      newInputs.push(inputs[i]);
    }
    setInputs(newInputs);
  };

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
      {inputs.map((input, index) => {
        return (
          <div key={"div".concat(index.toString())}>
            <label>Ingredient {index + 1} </label>
            <input
              // className="dynamic_inputs_input_text"
              // key={index}
              onChange={(e) => handleLastIngInputValChange(index, e)}
              type="text"
              value={input}
              key={"text_input".concat(index.toString())}
            />
            {
              // impenetrable logic
              (index > 0 || inputs.length > 0) &&
                (index < inputs.length - 1 ||
                  (index == 1 && inputs.length !== 2)) && (
                  <>
                    <button onClick={(e) => handleRemoveInput(index)}>X</button>
                  </>
                )
            }
          </div>
        );
      })}
    </>
  );
};

export default DynamicIngredientsInput;
