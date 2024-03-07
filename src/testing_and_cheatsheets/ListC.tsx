function ListC() {
  const items1 = ["aaa", "aaaaaaa", "AAAAAAAAAA"];
  /*constant array */

  return (
    <>
      <h1>AAAA</h1>
      <ul className="list-group">
        {items1.map((item) /*works like a for each loop */ => (
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

export default ListC;
