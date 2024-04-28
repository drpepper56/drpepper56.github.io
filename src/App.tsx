import "./css/page.css";
import { useState } from "react";
import LoginRegisterPage from "./components/LoginRegisterPage";
import ProfileCircle from "./components/ProfileCircle";
import LeftSideMenu from "./components/LeftSideMenu";
import RecipeDisplay from "./components/RecipeDisplay";
import { Recipe } from "./classes/Recipe";
import { SuggestionWithComponents } from "./classes/SuggestionWithComponents";

export enum PageMode {
  "LoginRegister",
  "Home",
}

/*
  TODO: change between server on cloud and local, floating island is local
*/
const server_address = "floating-island-38755-1b0593cccb18.herokuapp.com"; // cloud
// const server_address = "127.0.0.1"; // local
const server_port = 5000; // for local

export interface User {
  name: string;
  email: string;
  recipeList: Recipe[];
}

const App: React.FC = () => {
  /*
    State and Ref variables
  */
  const [currentPageMode, setCurrentPageMode] = useState(PageMode.Home);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  // recipe and suggestion holder
  const [recipeList, setRecipeList] = useState<Recipe[]>([new Recipe()]);
  const [suggestionsWithComponentsList, setSuggestionsWithComponentsList] =
    useState<SuggestionWithComponents[]>([new SuggestionWithComponents()]);
  // state for loading something
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //for login
  const handleLoginClick = () => {
    setCurrentPageMode(PageMode.LoginRegister);
    // console.log("go to login");
  };
  //for setting user after login
  const handleLoginSuccess = (user: User) => {
    setRecipeList(user.recipeList);
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
  // method of clearing the suggestions list
  const clearSuggestions = () => {
    setSuggestionsWithComponentsList([new SuggestionWithComponents()]);
  };

  /*
    Generation functions that take input and return ai generated stuff
    They need to be updated to do validation check on the user so that they cannot just be called, need context
  */

  // create the {3} initial suggestions for the user to chose from
  const generateInitialSuggestions = (
    map: Map<string, string[]>
  ): Promise<Map<string, string>> => {
    setIsLoading(true);
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
          // receive response and parse the json, turn it into an object and add the components used to generate it
          let data_raw = xhr.response;
          let data = new Map(Object.entries(data_raw)) as Map<string, string>;
          let suggestions = Array.from(data).map((value) => {
            return new SuggestionWithComponents(value[1], map);
          });
          // set the state of the suggestion array
          setSuggestionsWithComponentsList(suggestions);
          setIsLoading(false);
          // console.log("good good: ", data);
          resolve(data);
        } else {
          // if request unsuccessful
          // probably error message in there
          let data = xhr.response;
          console.info(data);
          setIsLoading(false);
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
    setIsLoading(true);
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
          addRecipeToPersonalList(recipe);
          setIsLoading(false);
          resolve(raw_data);
        } else {
          // if request unsuccessful
          // probably error message in there
          console.info(raw_data);
          setIsLoading(false);
          reject(raw_data);
        }
      };
    });
  };

  /* 
    Functions for adding and removing recipes from the user's personal list
    saves only for a login session
  */
  const addRecipeToPersonalList = (recipe: Recipe) => {
    let list = recipeList;
    list = list.concat([recipe]);
    setRecipeList(list);
  };
  const removeRecipeFromPersonalList = (title: string) => {
    for (let i = 0; i < recipeList.length; i++) {
      if (recipeList[i].title == title) {
        // remake the list without the recipe
        let tmp = Array.from(recipeList).filter(function (e) {
          if (e.title !== title) return e;
        });
        // replace the list
        setRecipeList(tmp);
      }
    }
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <LeftSideMenu
            generateInitialSuggestions={generateInitialSuggestions}
          />
          <div className="container-for-right_side">
            <div className="container-for-profile-circle">
              <div className="loading-display-container">
                {isLoading && (
                  <>
                    <p className="loading-status">Loading</p>
                    {/* animation from: https://loading.io/css/ */}
                    <div className="lds-dual-ring"></div>
                  </>
                )}
              </div>
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
            <RecipeDisplay
              generateFinalRecipe={generateFinalRecipe}
              passedRecipeProcessedList={recipeList}
              removeRecipe={removeRecipeFromPersonalList}
              suggestionsWithComponentsList={suggestionsWithComponentsList}
              clearSuggestions={clearSuggestions}
            />
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
