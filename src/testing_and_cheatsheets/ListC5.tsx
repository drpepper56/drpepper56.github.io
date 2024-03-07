import { MouseEvent } from "react";
import { useState } from "react";

interface ListC5Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
  /*create a signature to the function that will be later referenced when item is selected and can be passed by @App.tsx */
}
/*when calling this component the things inside the interface passed have to be passed like html attributes
 like so: <ListC5 items={items2} heading="AAAAAAAAAAAAA" /> */

function ListC5({ items, heading, onSelectItem }: ListC5Props) {
  /*props has been destructured so that it doesn't need to be called like props.items every time */
  let items2 = ["a", "b", "c", "5235"];

  let [selectedIndex, setSelectedIndex] = useState(-1);

  const handleClicked = (event: MouseEvent, item: string, index: number) => {
    setSelectedIndex(index);
    onSelectItem(item);
  };
  /*function to handle events, to get data from the event call methods or attributes of the event object,
       to get more accurate stuff use a more accurate event, like mouse event */

  return (
    <>
      <h1>
        {
          heading /*reference to the props element passed after it was destructured */
        }
      </h1>
      <ul className="list-group">
        {items.map(
          (
            item,
            index
          ) /*works like a for each loop, items is props.items */ => (
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
          )
        )}
      </ul>
    </>
  );
}

export default ListC5;
