import React from "react";

export default function ListC2() {
  const items1 = ["aaa", "aaaaaaa", "AAAAAAAAAA"];
  /*constant array */
  let items2 = ["a", "b", "c", "5235"];
  items2 = [];
  /*normal array */

  const message = items2.length === 0 ? <p>no items found</p> : null;
  /*one way of doing functions (not really a function) */

  const getMessage = () => {
    return items2.length === 0 ? <p>no items found</p> : null;
  };
  /*another way of doing functions with parameters */

  return (
    <>
      <h1>AAAA</h1>
      {getMessage()}
      {
        items2.length === 0 && <p>No items found</p>
        /*another, shorter logic way to implement the same if from the two functions above */
      }
      <ul className="list-group">
        {items2.map((item) /*works like a for each loop */ => (
          <li
            key={item}
            /*key is unique ID */
            className="list-group-item"
            /*bootstrap stuff */
            /*below is code that renders the item value dynamically (item from the list) */
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
