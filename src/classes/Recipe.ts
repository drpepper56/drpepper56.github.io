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
        this.title = title ? title : 'Sesame Soy Sauce Noodles with Stir-Fried Vegetables';
        this.preparationTime = preparationTime ? preparationTime : 15;
        this.cookingTime = cookingTime ? cookingTime : 20;
        this.numberOfServings = numberOfServings ? numberOfServings : 4;
        this.flavourDescription = flavourDescription ? flavourDescription : "This dish is a delicious Thai-inspired creation that combines the nutty flavor of sesame oil with the savory taste of soy sauce, all tossed together with tender noodles and vibrant stir-fried vegetables.";
        this.allergy = allergy ? allergy : ['rice: Gluten', 'sesame oil: Sesame', 'soy sauce: Soyabeans', 'sesame seeds: Sesame'];
        this.ingArray = ingArray ? ingArray : [['rice', '2 cups'], ['sesame oil', '2 tbsp'], ['soy sauce', '3 tbsp'], 
        ['sesame seeds', '1 tbsp'], ['green beans', '1 cup'], ['soy sauce', '3 tbsp'], ['carrots', '2'], ['broccoli', '3']]; 
        this.steps = steps ? steps : [['step1', 'Cook rice according to package instructions. In a small bowl, combine soy sauce and sesame oil.'],
        ['step2', 'Heat a large pan over medium heat. Add sesame seeds and toast until golden brown. Remove from pan.'],
        ['step3', 'Add carrots, green beans, and broccoli to the pan. Stir-fry until vegetables are tender.'],
        ['step4', 'Add cooked rice and sauce mixture to the pan. Toss to combine.'],
        ['step5', 'Serve hot, garnished with toasted sesame seeds.']];
        this.nutrition = nutrition ? nutrition : [["energy", "400kcal"], ["fat", " 12g"], ["carbohydrates", " 68g"], ["protein", " 10g"], ["salt", " 1g"]];
    }

    public static fromJson(json: any): Recipe {
        // this static function works with what the server returns after calling the generate full recipe call
    
        const title = json.title as string;
        const preparationTime = parseInt(json["preparationTime"] as string, 10);
        const cookingTime = parseInt(json.cookingTime as string, 10);
        const numberOfServings = parseInt(json.numberOfServings as string, 10);
        const flavourDescription = json.flavourDescription as string;
        const allergy = json.allergy as string[];

        // unpack more complex attributes
        const ingArray: [string, Object][] = json.ingArray as [string, Object][];
        const steps: [string, Object][] = json.steps as [string, Object][];
        const nutrition: [string, Object][] = json.nutrition as [string, Object][];
    
        // return new object
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