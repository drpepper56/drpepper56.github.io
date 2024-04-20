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
  let ingredients = passedRecipe.get("ingredients");
  // unpack the steps
  let steps = Array.from(
    new Map(
      Object.entries(JSON.parse(passedRecipe.get("steps")!.toString()))
    ).values()
  );
  let nutrition = passedRecipe.get("nutrition");
  let allergy = passedRecipe.get("allergy");

  return (
    <div className="builder-container">
      <div className="recipe-output-container">
        <ul className="recipe-parts-list">
          <li className="recipe-list-title">{title!.toString()}</li>
          <li className="recipe-list-preparation-time">
            {preparationTime!.toString()}
          </li>
          <li className="recipe-list-cooking-time">
            {cookingTime!.toString()}
          </li>
          <li className="recipe-list-number-of-servings">
            {numberOfServings!.toString()}
          </li>
          <li className="recipe-list-flavour-description">
            {flavourDescription!.toString()}
          </li>
          <li className="recipe-list-ingredients">{ingredients!.toString()}</li>
          <li className="recipe-list-steps">{steps!.toString()}</li>
          <li className="recipe-list-nutrition">{nutrition!.toString()}</li>
          <li className="recipe-list-allergy">{allergy!.toString()}</li>
        </ul>
      </div>
    </div>
  );
};

export default RecipeDisplay;
