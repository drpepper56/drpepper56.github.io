import "../css/suggestions_display.css";
import { SuggestionWithComponents } from "../classes/SuggestionWithComponents";

/*
Rendered in RecipeDisplay.Tsx, show the three suggestions if they are available, when clicking one, the suggestions are deleted from memory and it's used
along with the components to call the server to get a full recipe in App.tsx
*/

interface SuggestionsDisplayItems {
  // variable for holding the three generated suggestions and the components used to generate them
  suggestionsWithComponentsList: SuggestionWithComponents[];
  // function to call when a suggestion is chosen
  generateFromSuggestion: (
    recipeComponents: Map<string, string[]>,
    recipeDescription: string
  ) => Promise<Map<string, string>>;
}

const SuggestionsDisplay: React.FC<SuggestionsDisplayItems> = ({
  suggestionsWithComponentsList,
  generateFromSuggestion,
}) => {
  /*
    Function to call to consume a suggestion and get a full recipe, nothing is left here, implementation in App.tsx
  */
  const handleGenerateFinalRecipe = (
    recipeComponents: Map<string, string[]>,
    recipeDescription: string
  ) => {
    // call the function that connects to the server
    generateFromSuggestion(recipeComponents, recipeDescription).catch(
      (data: any) => {
        // log the error
        console.log("error", data);
      }
    );
  };

  return (
    <div className="suggestions-display">
      {suggestionsWithComponentsList.length > 1 &&
        suggestionsWithComponentsList.map((componentObject, index) => {
          return (
            <div
              className="suggestion-box"
              key={"suggestion_" + index}
              onClick={() =>
                handleGenerateFinalRecipe(
                  componentObject.componentMap,
                  componentObject.suggestion
                )
              }
            >
              <p className="suggestion">{componentObject.suggestion}</p>
            </div>
          );
        })}
    </div>
  );
};

export default SuggestionsDisplay;
