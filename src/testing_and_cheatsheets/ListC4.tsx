import { MouseEvent } from "react";
import { useState } from "react";
/*for dynamically changing variables that you want your components to keep track of */

function ListC4() {
  let items2 = ["a", "b", "c", "5235"];

  let [selectedIndex, setSelectedIndex] = useState(-1);
  /*returns a two value array, i0 is the value of the variable, i1 is the function that will be executed when i0 is changed to re-render the components */
  /*creating the variable like that lets you call the @selectedIndex and it's render function separately */

  const handleClicked = (event: MouseEvent, item: String, index: number) => {
    setSelectedIndex(index);
    /*pass the new value to the re-rendering function when you want to change @selectedIndex */
  };
  /*function to handle events, to get data from the event call methods or attributes of the event object,
     to get more accurate stuff use a more accurate event, like mouse event */

  return (
    <>
      <h1>AAAA</h1>
      <ul className="list-group">
        {items2.map((item, index) /*works like a for each loop */ => (
          <li
            key={item}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={(event) => handleClicked(event, item, index)}
            /*component property that is responsible for item being clicked, to have more than one parameter here use this format
               with event creating an arrow function and the rest of the parameters being passed later */
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListC4;
