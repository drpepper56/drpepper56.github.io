import "./css/page.css";
import { useState } from "react";
import LoginRegisterPage from "./components/LoginRegisterPage";
import ProfileCircle from "./components/ProfileCircle";
import LeftSideMenu from "./components/LeftSideMenu";
import RecipeDisplay from "./components/RecipeDisplay";
import { Recipe } from "./classes/Recipe";

export enum PageMode {
  "LoginRegister",
  "Home",
}

// const server_address = "floating-island-38755-1b0593cccb18.herokuapp.com"; // actual
const server_address = "127.0.0.1"; // testing
const server_port = 5000; // testing

export interface User {
  name: string;
  email: string;
}

// let recipeOutputForm = new Map([
//   ["title", title],
//   ["preparationTime", preparationTime],
//   ["cookingTime", cookingTime],
//   ["numberOfServings", numberOfServings],
//   ["flavourDescription", flavourDescription],
//   ["allergy", allergy],
//   ["ingArray", ingArray],
//   ["steps", steps],
//   ["nutrition", nutrition],
// ]);

const App: React.FC = () => {
  /*
    State and Ref variables
  */
  const [currentPageMode, setCurrentPageMode] = useState(PageMode.Home);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  // recipe holder
  // const focusRecipe = useRef(new Map([["", Object]]));
  const [focusRecipe, setFocusRecipe] = useState<Recipe>(new Recipe());
  const [recipeList, setRecipeList] = useState<[Recipe]>([new Recipe()]);
  const [recipeGenerated, setRecipeGenerated] = useState(false);

  //for login
  const handleLoginClick = () => {
    setCurrentPageMode(PageMode.LoginRegister);
    // console.log("go to login");
  };
  //for setting user after login
  const handleLoginSuccess = (user: User) => {
    setUser(user);
    setIsLoggedIn(true);
    setCurrentPageMode(PageMode.Home);
  };
  //for logout
  const handleLogoutClick = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCurrentPageMode(PageMode.LoginRegister);
  };
  // for closing login from within
  const handleLoginCloseItself = () => {
    setCurrentPageMode(PageMode.Home);
    // console.log("go to home");
  };
  //method to pass to elements that need to change the mode of the page
  const triggerPageModeChange = (pageMode: PageMode) => {
    setCurrentPageMode(pageMode);
    console.log(currentPageMode);
  };

  /*
    Generation functions that take input and return ai generated stuff
    They need to be updated to do validation check on the user so that they cannot just be called, need context
  */

  // create the {3} initial suggestions for the user to chose from
  const generateInitialSuggestions = (
    map: Map<string, string[]>
  ): Promise<Map<string, string>> => {
    return new Promise((resolve, reject) => {
      // do some checks on the prompt components to filter out non-sensible stuff

      /* 
      Compose the message to the server
      Set the url, if the port is localhost or 127.0.0.1 (e.g. server is run in a local environment for testing purposes) use the port
    */
      let path = "/init_suggestions";
      if (server_address.toString() == "127.0.0.1") {
        var url = "http://" + server_address + ":" + server_port + path;
      } else {
        var url = "https://" + server_address + path;
      }

      //create http request object and set it's parameters
      var xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");

      /*
        Send the request
        Create the url string
        Create the return map
      */
      let recipeComponents = {
        ing: map.get("ing"),
        style: map.get("style"),
        allergies: map.get("allergies"),
      };
      let jsonPayload = JSON.stringify(recipeComponents);
      xhr.send(jsonPayload);

      //resolve the server's response
      xhr.onload = () => {
        if (xhr.status == 200) {
          // if request  successful
          //receive response and parse the json
          let data = xhr.response;
          // console.log("good good: ", data);
          resolve(data);
        } else {
          // if request unsuccessful
          // probably error message in there
          let data = xhr.response;
          console.info(data);
          reject(data);
        }
      };
    });
  };

  // function to generate {1} full recipe, given a pre-generated suggestion and the components that went into that suggestions
  const generateFinalRecipe = (
    componentMap: Map<string, string[]>,
    recipeDescription: string
  ): Promise<Map<string, string>> => {
    return new Promise((resolve, reject) => {
      // do some checks on the prompt components to filter out non-sensible stuff

      /* 
      Compose the message to the server
      Set the url, if the port is localhost or 127.0.0.1 (e.g. server is run in a local environment for testing purposes) use the port
    */
      let path = "/recipe_generate";
      if (server_address.toString() == "127.0.0.1") {
        var url = "http://" + server_address + ":" + server_port + path;
      } else {
        var url = "https://" + server_address + path;
      }

      //create http request object and set it's parameters
      var xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");

      /*
        Send the request
        Create the url string
        Create the return map
      */
      let prompt = {
        ing: componentMap.get("ing"),
        style: componentMap.get("style"),
        allergies: componentMap.get("allergies"),
        description: recipeDescription,
      };
      let jsonPayload = JSON.stringify(prompt);
      xhr.send(jsonPayload);

      //resolve the server's response
      xhr.onload = () => {
        //receive response
        let raw_data = xhr.response;
        if (xhr.status == 200) {
          /*  If request successful
            Notify the recipe display object that a recipe has been generated, also reset it
            Call function to pass the complete recipe to the recipe display
          */
          let recipe = Recipe.processRecipeToOutputForm(
            new Map(Object.entries(raw_data))
          );
          setFocusRecipe(recipe);
          setRecipeGenerated(true);
          resolve(raw_data);
        } else {
          // if request unsuccessful
          // probably error message in there
          console.info(raw_data);
          reject(raw_data);
        }
      };
    });
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <LeftSideMenu
            generateInitialSuggestions={generateInitialSuggestions}
            generateFinalRecipe={generateFinalRecipe}
          />
          <div className="container-for-right_side">
            <div className="container-for-profile-circle">
              <ProfileCircle
                letter={
                  isLoggedIn && user != null
                    ? user.name.substring(0, 1).toUpperCase()
                    : "?"
                }
                loginStatus={isLoggedIn}
                logoutFunction={handleLogoutClick}
                pageNavigation={triggerPageModeChange}
              />
            </div>
            {recipeGenerated && (
              <RecipeDisplay passedRecipeProcessed={focusRecipe} />
            )}
          </div>
        </>
      ) : (
        <LoginRegisterPage
          serverPort={server_port}
          serverAddress={server_address}
          loginSuccess={handleLoginSuccess}
          selfClose={handleLoginCloseItself}
          setIsLoggedIn={setIsLoggedIn}
          onLogin={handleLoginClick}
        />
      )}
    </div>
  );
};

export default App;
