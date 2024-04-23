// where the recipe is displayed

/* 
    The recipe json object/map is passed here and then each entry/key is mapped manually to a li object
*/

import "../css/recipe_display.css";
import { Recipe } from "../classes/Recipe";

interface RecipeDisplayItems {
  // the recipe state that is saved in App.tsx, when it updates, this whole element should update with it
  passedRecipeProcessed: Recipe;
  //
}
const RecipeDisplay: React.FC<RecipeDisplayItems> = ({
  passedRecipeProcessed,
}) => {
  /* 
    Create an array that holds everything ready for output, this will be added to all other
    recipes of the current user so that that they can be displayed in a scrollable way
  */

  return (
    <div className="recipe-display">
      <div className="recipe-output-container">
        <div className="recipe-scrollable-list">
          <div className="recipe-paged">
            <ul className="recipe-parts-list">
              <li className="recipe-list-title">
                <p>
                  {passedRecipeProcessed.title +
                    " - " +
                    passedRecipeProcessed.flavourDescription}
                </p>
              </li>
              <li className="recipe-list-time-servings">
                <p className="desc-label">
                  Preparation Time
                  <p className="desc-count">
                    {passedRecipeProcessed.preparationTime}
                  </p>
                </p>
                <p className="desc-label">
                  Cooking Time
                  <p className="desc-count">
                    {passedRecipeProcessed.cookingTime}
                  </p>
                </p>
                <p className="desc-label">
                  Servings
                  <p className="desc-count">
                    {passedRecipeProcessed.numberOfServings}
                  </p>
                </p>
              </li>
              <li className="recipe-list-ingredients">
                <p className="ingredients-title">Ingredients</p>
                {passedRecipeProcessed.ingArray.map((value, index) => {
                  return (
                    <p key={"ingredient_p_" + index} className="ingredient">
                      {value[0] + ": " + value[1]}
                    </p>
                  );
                })}
              </li>
              <li className="recipe-list-steps">
                <p className="steps-title">Steps</p>
                {passedRecipeProcessed.steps.map((value, index) => {
                  return <p key={index}>{value[1]!.toString()}</p>;
                })}
              </li>
              <li className="recipe-list-nutrition">
                <p className="nutrition-title">Nutrition Values</p>
                {passedRecipeProcessed.nutrition.map((valueArray, index) => {
                  return (
                    <p key={"nutrition_value_" + index} className="nutrition">
                      {valueArray[0] + ": " + valueArray[1]}
                    </p>
                  );
                })}
              </li>
              <li className="recipe-list-allergy">
                <p className="allergy-title">Allergies</p>
                {passedRecipeProcessed.allergy.map((valueArray, index) => {
                  return (
                    <p key={"nutrition_value_" + index} className="allergy">
                      {valueArray +
                        (index < passedRecipeProcessed.allergy.length - 1
                          ? ", "
                          : " ")}
                    </p>
                  );
                })}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;
