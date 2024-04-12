import { MouseEvent } from "react";

function ListC3() {
  let items2 = ["a", "b", "c", "5235"];
  /*normal array */

  const handleClicked = (event: MouseEvent, item: String, index: number) => {
    console.log(item, index);
    console.log(event);
  };
  /*function to handle events, to get data from the event call methods or attributes of the event object,
   to get more accurate stuff use a more accurate event, like mouse event */

  return (
    <>
      <h1>AAAA</h1>
      {
        items2.length === 0 && <p>No items found</p>
        /*another, shorter logic way to implement the same if from the two functions above */
      }
      <ul className="list-group">
        {items2.map((item, index) /*works like a for each loop */ => (
          <li
            key={item}
            /*key is unique ID */
            className="list-group-item"
            /*bootstrap stuff */
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

export default ListC3;
