$(document).ready(function() {
    // Initial array
       var animalsArray = ["cat", "dog", "snake","dinosaur","bear","wolf"];
       
     function displayAnimalGifs(){
        $("#images-display").empty();
        var animalClick = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animalClick + "&api_key=PajvN9dlza2xbKVW1FiagasR05aKqyaL";
   
        $.ajax({
          url: queryURL,
          method: "GET"
        })
    
          .then(function(response) {
            var imageUrl = [];
           console.log(response);
           
           var newDiv = $("<div>");
 
         for (var a = 0; a < response.data.length; a++) {
 
             var rating = response.data[a].rating;
             var animatedImg = response.data[a].images.fixed_height.url;
             var stillImage = response.data[a].images.fixed_height_still.url;
             var animalImage = $("<img>");
             var p = $("<p>").text("Rating: " + rating);
 
           
             animalImage.attr("src", stillImage);
             animalImage.addClass("gif");
             animalImage.attr("data-state", "still");
             animalImage.attr("data-still", stillImage);
             animalImage.attr("data-animate", animatedImg);
             
           newDiv.append(animalImage);
           newDiv.append(p);
           $("#images-display").prepend(newDiv);
 }
          });
 }
 function pauseGifs(){
 // $(".gif").on("click", function() {
   var state = $(this).attr('data-state');
   if (state === 'still') {
     $(this).attr('src', $(this).attr('data-animate'));
     $(this).attr('data-state', 'animate');
   } else {
     $(this).attr('src', $(this).attr('data-still'));
     $(this).attr('data-state', 'still');
   }
 // });
 }
 function renderButtons() {
         $("#animal-view").empty();
         for (var i = 0; i < animalsArray.length; i++) {
         var addedButton = $("<button>");
           addedButton.addClass("animal-btn btn btn-primary");
            addedButton.attr("data-name", animalsArray[i]);
          addedButton.text(animalsArray[i]);
          $("#animal-view").append(addedButton);
         }
 }
 
 $("#add-animal").on("click", function(event) {
         event.preventDefault();
         var animal = $("#animal-input").val().trim();
         animalsArray.push(animal);
         renderButtons();
       });
 
 $(document).on("click", ".gif", pauseGifs);
 $(document).on("click", ".animal-btn", displayAnimalGifs);
 renderButtons();
 });
 