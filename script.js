// Lance Chandler SE 3200 
//encodeURIComponent()
console.log("this is a test of the javascript connection");

var button1 = document.querySelector("#button1");


button1.onclick = function(){
    var VideoGameRating = document.querySelector("#Rating");
    var VideoGameName = document.querySelector("#GameName");
    var VideoGameReviewAuthor = document.querySelector("#Author");
    var VideoGameReview = document.querySelector("#Description");
    var date = document.querySelector("#Date");
    //console.log(VideoGameName.value);
    //console.log(VideoGameRating.value);
    //console.log(VideoGameReviewAuthor.value);
    //console.log(VideoGameReview.value);
    //console.log(date.value);
    createVideoGamesFromServer(VideoGameName.value,VideoGameRating.value,VideoGameReview.value,VideoGameReviewAuthor.value,date.value);

}
/*

*/


var x = {};
function loadUsersFromServer(){
    fetch("https://gamernationexpo.herokuapp.com/users").then(function(response) {
        response.json().then(function(data_from_server) {
            x = data_from_server;
            var loginButton = document.querySelector("#button4");

            loginButton.onclick = function(){
            var email = document.querySelector("#email");
            var password = document.querySelector("#password");
            var firstname = document.querySelector("#firstName");
            var lastname = document.querySelector("#lastName");
            
            }
        });
    });
}
function loadVideoGamesFromServer(){
    fetch("https://gamernationexpo.herokuapp.com/videogames").then(function(response) {
        response.json().then(function(data_from_server) {
            x = data_from_server;
            //TODO: use a loop to display all of the data into DOM
            var unorderedList = document.querySelector("ul");
            unorderedList.innerHTML = "";
            data_from_server.forEach(function (game) {
                //code will execute once per item in the list
                var unorderedListItem = document.createElement("li");
                unorderedList.appendChild(unorderedListItem);
                //unorderedListItem.innerHTML = game.name;

                var colorDiv = document.createElement("div");
                colorDiv.className = "colorDiv";
                colorDiv.innerHTML = "="
                colorDiv.style.backgroundColor = "#dadce0"
                unorderedListItem.appendChild(colorDiv);

                var nameDiv = document.createElement("div");
                nameDiv.innerHTML = "TITLE:  " + game.name;
                nameDiv.className = "nameDiv";
                unorderedListItem.appendChild(nameDiv);

                var authorDiv = document.createElement("div");
                authorDiv.innerHTML = "AUTHOR:  " + game.author;
                authorDiv.className = "authorDiv";
                unorderedListItem.appendChild(authorDiv);

                var ratingDiv = document.createElement("div");
                ratingDiv.innerHTML = "RATING:  " + game.rating;
                //console.log(game.VideoGameRating);
                ratingDiv.className = "ratingDiv";
                unorderedListItem.appendChild(ratingDiv);

                var descriptionDiv = document.createElement("div");
                descriptionDiv.innerHTML = game.description;
                descriptionDiv.className = "descriptionDiv";
                unorderedListItem.appendChild(descriptionDiv);

                var dateDiv = document.createElement("div");
                dateDiv.innerHTML = "DATE:   " + game.date;
                dateDiv.className = "dateDiv";
                unorderedListItem.appendChild(dateDiv);

                
                
                var deleteButton = document.createElement("button");
                deleteButton.className = "deleteButton";
                deleteButton.onclick = function(){
                    if (confirm("Delete This Entry?")){
                        deleteVideoGameFromServer(game.id);
                        console.log("Please Delete this",game.id);
                    }
                    //TODO: call new function deleteVideogamefromserver
                    
                    //pass place.id to this function for context
                    
                };
                deleteButton.innerHTML = "DELETE";
                unorderedListItem.appendChild(deleteButton);
                
                var editButton = document.createElement("button");
                editButton.className = "editButton";
                var button2 = document.querySelector("#button2");
                var addDiv = document.querySelector("#new");
                var editDiv = document.querySelector("#edit");

                editButton.onclick = function(){
                    addDiv.style.display = "None";
                    editDiv.style.display = "grid";
                    var VideoGameRating = document.querySelector("#RatingEdit");
                    var VideoGameName = document.querySelector("#GameNameEdit");
                    var VideoGameReviewAuthor = document.querySelector("#AuthorEdit");
                    var VideoGameReview = document.querySelector("#DescriptionEdit");
                    var date = document.querySelector("#DateEdit");
                    VideoGameReview.value = game.description;
                    VideoGameName.value = game.name;
                    VideoGameRating.value = game.rating;
                    VideoGameReviewAuthor.value = game.author;
                    date.value = game.date;
                    
                    button2.onclick = function(){
                        
                        //console.log(VideoGameName.value);
                        //console.log(VideoGameRating.value);
                        //console.log(VideoGameReviewAuthor.value);
                        //console.log(VideoGameReview.value);
                        //console.log(date.value);
                        console.log(game.id)
                        updateVideoGameFromServer(game.id,VideoGameName.value,VideoGameRating.value,VideoGameReview.value,VideoGameReviewAuthor.value,date.value);
                        addDiv.style.display = "grid";
                        editDiv.style.display = "none";
                    }
                    
                };

                
                

                editButton.innerHTML = "EDIT";
                unorderedListItem.appendChild(editButton)

                //insert data into a new DOM element
            });
        });
    });
}
function updateVideoGameFromServer(videogame_id,name,rating,description,author,date){
    var data = "name=" + encodeURIComponent(name);
    data += "&rating=" + encodeURIComponent(rating);
    data += "&description=" + encodeURIComponent(description);
    data += "&author=" + encodeURIComponent(author);
    data += "&date=" + encodeURIComponent(date);

    fetch(`https://gamernationexpo.herokuapp.com/videogames/${videogame_id}`,{
        method: 'PUT',
        body: data,
        headers:{
            "Content-Type" : "application/x-www-form-urlencoded"
        } 
    }).then(function(response){
        loadVideoGamesFromServer()
    });
}
function deleteVideoGameFromServer(videogame_id){
    fetch(`https://gamernationexpo.herokuapp.com/videogames/${videogame_id}`,{
        method: 'DELETE'

    }).then(function(response){
        loadVideoGamesFromServer()
    });

}
function createVideoGamesFromServer(vidGameName,vidGameRating,vidGameReview,vidGameReviewAuthor,date){
    var data = "name=" + encodeURIComponent(vidGameName);
    data += "&rating=" + encodeURIComponent(vidGameRating);
    data += "&description=" + encodeURIComponent(vidGameReview);
    data += "&author=" + encodeURIComponent(vidGameReviewAuthor);
    data += "&date=" + encodeURIComponent(date);

    fetch("https://gamernationexpo.herokuapp.com/videogames",{ 
        //request options go here
        //method header(s) body
        method: "POST",
        body: data,
        headers: {
            //headers here
            "Content-Type" : "application/x-www-form-urlencoded"
        }


    }).then(function(response){
        //response code gos here
        loadVideoGamesFromServer()
        //TODO: refresh the data by calling loadVideoGamesFromServer

    });
}

function createUserFromServer(firstName,lastName,email,password){

    var data = "firstName=" + encodeURIComponent(firstName);
    data += "&lastName=" + encodeURIComponent(lastName);
    data += "&email=" + encodeURIComponent(email);
    data += "&password=" + encodeURIComponent(password);

    fetch("https://gamernationexpo.herokuapp.com/users",{
        method: "POST",
        body: data,
        headers: {
            //headers here
            "Content-Type" : "application/x-www-form-urlencoded"
        }
        
    }).then(function(response){
            //TODO: figure out what to put here
            loadUsersFromServer()
        });

}


loadVideoGamesFromServer()
