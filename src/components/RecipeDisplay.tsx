// where the recipe is displayed

/* 
  The recipe json object/map is passed here and then each entry/key is mapped manually to a li object
*/

// cancel by Blair Adams from <a href="https://thenounproject.com/browse/icons/term/cancel/" target="_blank" title="cancel Icons">Noun Project</a> (CC BY 3.0)
import closeImage from "../assets/close.png";
import "../css/recipe_display.css";
import { Recipe } from "../classes/Recipe";
import SuggestionsDisplay from "./SuggestionsDisplay";
import { SuggestionWithComponents } from "../classes/SuggestionWithComponents";

interface RecipeDisplayItems {
  // the recipe state that is saved in App.tsx, when it updates, this whole element should update with it
  passedRecipeProcessedList: Recipe[];
  // method to remove a recipe from the list
  removeRecipe: (title: string) => void;
  // variable to receive the suggestions
  suggestionsWithComponentsList: SuggestionWithComponents[];
  // function to call to consume a suggestion
  generateFinalRecipe: (
    componentsMap: Map<string, string[]>,
    recipeDescription: string
  ) => Promise<Map<string, string>>;
  // function to call to clear the suggestions from memory
  clearSuggestions: () => void;
}
const RecipeDisplay: React.FC<RecipeDisplayItems> = ({
  passedRecipeProcessedList,
  removeRecipe,
  suggestionsWithComponentsList,
  generateFinalRecipe,
  clearSuggestions,
}) => {
  /* 
    Function for suggestion display to close itself when suggestions are consumed
  */
  const handleGenerateFinalRecipe = (
    componentsMap: Map<string, string[]>,
    recipeDescription: string
  ) => {
    clearSuggestions();
    console.log(suggestionsWithComponentsList);
    return generateFinalRecipe(componentsMap, recipeDescription);
  };

  /* 
    Load the array that holds every recipe to output and reverse it to show the most recent recipes on top
  */
  let reverseList = [] as Recipe[];

  for (let i = passedRecipeProcessedList.length - 1; i >= 0; i--) {
    reverseList.push(passedRecipeProcessedList[i]);
  }

  return (
    <div className="recipe-display">
      {suggestionsWithComponentsList !== null && (
        <SuggestionsDisplay
          suggestionsWithComponentsList={suggestionsWithComponentsList}
          generateFromSuggestion={handleGenerateFinalRecipe}
        />
      )}
      <div className="recipe-output-container">
        <div className="recipe-scrollable-list">
          <ul className="recipes-list-iterator">
            {reverseList.map((ValueRecipe, index) => {
              return (
                <div className="recipe-paged" key={index}>
                  <ul className="recipe-parts-list">
                    <li className="recipe-list-title">
                      <p className="recipe-title">
                        {ValueRecipe.title +
                          " - " +
                          ValueRecipe.flavourDescription}
                      </p>
                      <img
                        className="close-circle"
                        onClick={() => removeRecipe(ValueRecipe.title)}
                        src={closeImage}
                      />
                    </li>
                    <li className="recipe-list-time-servings">
                      <div className="desc-label">
                        Preparation Time
                        <p className="desc-count">
                          {ValueRecipe.preparationTime}
                        </p>
                      </div>
                      <div className="desc-label">
                        Cooking Time
                        <p className="desc-count">{ValueRecipe.cookingTime}</p>
                      </div>
                      <div className="desc-label">
                        Servings
                        <p className="desc-count">
                          {ValueRecipe.numberOfServings}
                        </p>
                      </div>
                    </li>
                    <li className="recipe-list-ingredients">
                      <p className="ingredients-title">Ingredients</p>
                      {ValueRecipe.ingArray.map((value, index) => {
                        return (
                          <p
                            key={"ingredient_p_" + index}
                            className="ingredient"
                          >
                            {value[0] + ": " + value[1]}
                          </p>
                        );
                      })}
                    </li>
                    <li className="recipe-list-steps">
                      <p className="steps-title">Steps</p>
                      {ValueRecipe.steps.map((value, index) => {
                        return <p key={index}>{value[1]!.toString()}</p>;
                      })}
                    </li>
                    <li className="recipe-list-nutrition">
                      <p className="nutrition-title">Nutrition Values</p>
                      {ValueRecipe.nutrition.map((valueArray, index) => {
                        return (
                          <p
                            key={"nutrition_value_" + index}
                            className="nutrition"
                          >
                            {valueArray[0] + ": " + valueArray[1]}
                          </p>
                        );
                      })}
                    </li>
                    <li className="recipe-list-allergy">
                      <p className="allergy-title">Allergens</p>
                      <div className="right-side-allergy-box">
                        {ValueRecipe.allergy.map((valueArray, index) => {
                          return (
                            <p key={"allergy_" + index} className="allergy">
                              {valueArray +
                                (index < ValueRecipe.allergy.length - 1
                                  ? ", "
                                  : " ")}
                            </p>
                          );
                        })}
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;
