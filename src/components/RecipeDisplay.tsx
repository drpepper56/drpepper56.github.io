// where the recipe is displayed

/* 
    The recipe json object/map is passed here and then each entry/key is mapped manually to a li object
*/

import "../css/recipe_display.css";

interface RecipeDisplayItems {
  // the recipe state that is saved in App.tsx, when it updates, this whole element should update with it
  passedRecipe: Map<string, Object>;
}
const RecipeDisplay: React.FC<RecipeDisplayItems> = ({ passedRecipe }) => {
  // unpack the map returned from the server
  let title = passedRecipe.get("title");
  let preparationTime = passedRecipe.get("preparation_time");
  let cookingTime = passedRecipe.get("cooking_time");
  let numberOfServings = passedRecipe.get("number_of_servings");
  let flavourDescription = passedRecipe.get("flavour_description");
  // unpack into 2d array where [x] is ing count, and [y] is the field
  let ingArray = Array.from(
    new Map(
      Object.entries(JSON.parse(passedRecipe.get("ingredients")!.toString()))
    )
  );
  console.info(ingArray);
  // unpack the steps
  let steps = Array.from(
    new Map(
      Object.entries(JSON.parse(passedRecipe.get("steps")!.toString()))
    ).values()
  );
  // unpack nutrition
  console.log(passedRecipe.get("nutrition")!.toString());
  console.log(JSON.parse(passedRecipe.get("nutrition")!.toString()));
  let nutrition = Array.from(
    new Map(
      Object.entries(JSON.parse(passedRecipe.get("nutrition")!.toString()))
    )
  );
  console.log(nutrition);
  let allergy = passedRecipe.get("allergy");

  return (
    <div className="recipe-display">
      <div className="recipe-output-container">
        <ul className="recipe-parts-list">
          <li className="recipe-list-title">
            <p>{title!.toString() + " - " + flavourDescription!.toString()}</p>
          </li>
          <li className="recipe-list-time-servings">
            <p className="desc-label">
              Preparation Time
              <p className="desc-count">{preparationTime!.toString()}</p>
            </p>
            <p className="desc-label">
              Cooking Time
              <p className="desc-count">{cookingTime!.toString()}</p>
            </p>
            <p className="desc-label">
              Servings
              <p className="desc-count">{numberOfServings!.toString()}</p>
            </p>
          </li>
          <li className="recipe-list-ingredients">
            <p className="ingredients-title">Ingredients</p>
            {ingArray.map((valueArray, index) => {
              return (
                <p key={"ingredient_p_" + index} className="ingredient">
                  {valueArray[0] + ": " + valueArray[1]}
                </p>
              );
            })}
          </li>
          <li className="recipe-list-steps">
            {steps.map((value, index) => {
              return <p key={index}>{value!.toString()}</p>;
            })}
          </li>
          <li className="recipe-list-allergy">
            <p>{allergy!.toString()}</p>
          </li>
          <li className="recipe-list-nutrition">
            {nutrition.map((valueArray, index) => {
              return (
                <p key={"nutrition_value_" + index} className="nutrition">
                  {valueArray[0] + ": " + valueArray[1]}
                </p>
              );
            })}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RecipeDisplay;
