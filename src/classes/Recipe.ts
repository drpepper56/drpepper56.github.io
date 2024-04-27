/*
    Hold the recipe
*/
export class Recipe {
    public title: string = "";
    public preparationTime: number = 0;
    public cookingTime: number = 0;
    public numberOfServings: number = 0;
    public flavourDescription: string = "";
    public allergy: string[] = [""];
    public ingArray: [string, Object][] = [["", ""]];
    public steps: [string, Object][] = [["", ""]];
    public nutrition: [string, Object][] = [["", ""]];

    /*
        Function to process the full recipes returned from the api
    */    
    public static processRecipeToOutputForm(passedRecipe: Map<string, Object>) {
        // unpack the map returned from the server

        let title = passedRecipe.get("title")!.toString();
        let preparationTime = parseInt(
        passedRecipe.get("preparation_time")!.toString()
        );
        let cookingTime = parseInt(passedRecipe.get("cooking_time")!.toString());
        let numberOfServings = parseInt(
        passedRecipe.get("number_of_servings")!.toString()
        );  
        let flavourDescription = passedRecipe
        .get("flavour_description")!
        .toString();
        console.log('IN THE OBJECT CALLABLE', passedRecipe.get("allergy"))
        let allergy = passedRecipe.get("allergy") as string[];

        // unpack ingredients
        let ingArray = Array.from(
        new Map(
            Object.entries(JSON.parse(passedRecipe.get("ingredients")!.toString()))
            )
        ) as [string, Object][];

        // unpack steps
        let steps = Array.from(
        new Map(Object.entries(JSON.parse(passedRecipe.get("steps")!.toString())))
        ) as [string, Object][];

        // unpack nutrients
        let nutrition = Array.from(
        new Map(
            Object.entries(JSON.parse(passedRecipe.get("nutrition")!.toString()))
            )
        ) as [string, Object][];

        let recipeOutputForm = new Recipe(
        title,
        preparationTime,
        cookingTime,
        numberOfServings,
        flavourDescription,
        allergy,
        ingArray,
        steps,
        nutrition
        );
        return recipeOutputForm;
    }

    constructor(
        title?: string,
        preparationTime?: number,
        cookingTime?: number,
        numberOfServings?: number,
        flavourDescription?: string,
        allergy?: string[],
        ingArray?: [string, Object][],
        steps?: [string, Object][],
        nutrition?: [string, Object][],
    ) {
        // assignments with some defaults
        this.title = title ? title : 'polish caserole';
        this.preparationTime = preparationTime ? preparationTime : 15;
        this.cookingTime = cookingTime ? cookingTime : 30;
        this.numberOfServings = numberOfServings ? numberOfServings : 4;
        this.flavourDescription = flavourDescription ? flavourDescription : "i can't spell";
        this.allergy = allergy ? allergy : ['No Allergies'];
        this.ingArray = ingArray ? ingArray : [['potato', '3 medium-sized potatoes'], ['ketchup', '1/4 cup']]; 
        this.steps = steps ? steps : [['step1', 'Preheat the oven to 400°F (200°C) and line a baking sheet with parchment paper.'],
        ['step2', 'Peel and dice the potatoes into small cubes.'],
        ['step3', 'Place the diced potatoes on the prepared baking sh…salt, pepper, and any additional spices you like.'],
        ['step4', 'Bake in the oven for 25-30 minutes or until the potatoes are golden brown and crispy.'],
        ['step5', 'Warm up the tortillas in a dry skillet or in the oven.'],
        ['step6', 'Fill each tortilla with the roasted potatoes and drizzle with ketchup.'],
        ['step7', 'Serve the tacos hot and enjoy!']];
        nutrition ? this.nutrition = nutrition : null;
    }

    public static fromJson(json: any): Recipe {
        // Validate JSON structure (optional)
        // if (!json.hasOwnProperty('title') || !json.hasOwnProperty('preparationTime') || ...) {
        //   throw new Error('Invalid JSON format for Recipe');
        // }
    
        const title = json.title as string;
        const preparationTime = parseInt(json["preparationTime"] as string, 10);
        const cookingTime = parseInt(json.cookingTime as string, 10);
        const numberOfServings = parseInt(json.numberOfServings as string, 10);
        const flavourDescription = json.flavourDescription as string;
        const allergy = json.allergy as string[];

        // Handle nested JSON for ingredients, steps, and nutrition
        const ingArray: [string, Object][] = json.ingArray as [string, Object][];
        const steps: [string, Object][] = json.steps as [string, Object][];
        const nutrition: [string, Object][] = json.nutrition as [string, Object][];
    
        return new Recipe(
          title,
          preparationTime,
          cookingTime,
          numberOfServings,
          flavourDescription,
          allergy,
          ingArray,
          steps,
          nutrition
        );
      }
}