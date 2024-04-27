import "../css/suggestions_display.css";
import { SuggestionWithComponents } from "../classes/SuggestionWithComponents";

interface SuggestionsDisplayItems {
  // variable for holding the three generated suggestions and the components used to generate them
  suggestionsWithComponentsList: SuggestionWithComponents[];
  // function to call when a suggestion is chosen
  generateFromSuggestion: (
    recipeComponents: Map<string, string[]>,
    recipeDescription: string
  ) => Promise<Map<string, string>>;
  // a function to close itself
}
const SuggestionsDisplay: React.FC<SuggestionsDisplayItems> = ({
  suggestionsWithComponentsList,
  generateFromSuggestion,
}) => {
  /*
        Function to call to consume a suggestion
    */
  const handleGenerateFinalRecipe = (
    recipeComponents: Map<string, string[]>,
    recipeDescription: string
  ) => {
    // call the function that connects to the server
    generateFromSuggestion(recipeComponents, recipeDescription)
      .then((raw_data: any) => {
        console.log(raw_data);
        // close this component
        // setSuggestion([""]);
      })
      .catch((data: any) => {
        // log the error
        console.log("error", data);
      });
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
                  componentObject.comsponentMap,
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
