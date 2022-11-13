  // JavaScript for TP6

//function to load a file from the URL "fromFile" into the object identified by "whereTo"
function loadFileInto(recipeID, listName, whereTo) {

	// creating a new XMLHttpRequest object
	ajax = new XMLHttpRequest();
  
  // define the fromFile variable with the passed recipe name and list
  fromFile = "recipes.php?recipeID=" + recipeID + "&recipeList=" + listName;
  
  console.log("From URL: " + fromFile);

	// defines the GET/POST method, source, and async value of the AJAX object
	ajax.open("GET", fromFile, true);

	// provides code to do something in response to the AJAX request
	ajax.onreadystatechange = function() {
    
			if ((this.readyState == 4) && (this.status == 200)) {
        
				console.log("AJAX response: " + this.responseText);
        
        if(this.responseText != 0) {
          
          responseArray = JSON.parse(this.responseText);
          
          responseHTML = "";
          for (x=0; x < responseArray.length; x++) {
            responseHTML += "<li>" + responseArray[x] + "</li>";
          }
          
          document.querySelector(whereTo).innerHTML = responseHTML;
          
        } else {
          console.log("Error: no recipe/list found");
        }
        
			} else if ((this.readyState == 4) && (this.status != 200)) {
        
        console.log("Error: " + this.responseText);
        
      }
		
	} // end ajax.onreadystatechange function

	// initiate request and wait for response
	ajax.send();

}



// new Recipe object
function Recipe(recipeName, imgURL, contributorName, recipeID){
  
  this.recipeName = recipeName;
  this.imgSrc = imgURL;
  this.contributor = contributorName;
  this.id = recipeID;
  
  this.displayRecipe = function() {
    
    document.querySelector("#titleBanner h1").innerHTML = this.recipeName;
    document.querySelector("#contributor").innerHTML = this.contributor;
    document.querySelector("#titleBanner").style.backgroundImage = "url(" + this.imageURL +")";
    
    loadFileInto(this.recipeID, "ingredients", "#ingredients ul");
    loadFileInto(this.recipeID, "equipment", "#equipment ul");
    loadFileInto(this.recipeID, "directions", "#directions ol");
    
  }
  
}


MonkeyBreadKabobs = new Recipe(
  "Monkey Bread Kabobs",    
  "https://cdn.pixabay.com/photo/2013/09/16/16/03/banana-182852_960_720.jpg", 
  "Madelyn Lease",
  "monkeyBreadKabobs", 
);


FluffyFrenchToast = new Recipe(
  "Fluffy French Toast", 
  "https://images.unsplash.com/photo-1639108094328-2b94a49b1c2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80", 
  "Analysse Palomares",
  "fluffyFrenchToast",
);


TresLechesCake = new Recipe(
  "Tres Leches Cake", 
  "https://images.unsplash.com/photo-1602663491496-73f07481dbea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80", 
  "Eleno Rivera",
  "tresLechesCake",
);
