


//definition of all variables needed in the game

var cardArray = ['A', 'A', 'B', 'B','C','C','D','D','E','E','F','F','G','G','H','H'];
var cardValues = [];
var cardIDs = [];
var cardReversed = 0;
var countingMoves = 0;
var timer = [];
var stars = 3;

Array.prototype.cardShuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
//This function creates a new board everytime a game is finished or when the browser will be refreshed
function createNewBoard(){

	cardReversed = 0;
	var output = '';
    cardArray.cardShuffle(); //shuffling all the cards and creates a new order on the board
	for(var i = 0; i < cardArray.length; i++){
		output += '<div id="card_'+i+'" onclick="reversingCards(this,\''+ cardArray[i]+'\')"></div>';
	}
	document.getElementById('gameBoard').innerHTML = output;
}


//This function is for the whole game
  function reversingCards(card,value){
  	 if(card.innerHTML == "" && cardValues.length < 2){
  		card.style.background = '#FFF';
  		card.innerHTML = value;
  		if(cardValues.length == 0){
  			cardValues.push(value);
  			cardIDs.push(card.id);
  		} else if(cardValues.length == 1){
  			cardValues.push(value);
  			cardIDs.push(card.id);
  			if(cardValues[0] == cardValues[1]){ //here checking if opended cards math to each other or not
  				cardReversed += 2;
          countingMoves += 1;
          document.getElementById('count').innerHTML = countingMoves; //counting the right moves
  				// Clear both arrays
  				cardValues = [];
          cardIDs = [];
          if(cardReversed == cardArray.length) { //checking if all cards where reversed and matched to each other
            clearInterval(timer);
            timmer = null;
            swal({ //Alert after finishing the game
            		allowEscapeKey: false,
            		allowOutsideClick: false,
            		title: 'Congratulations! \n You finally did it!',
            		text: 'You finished the game in ' + countingMoves + ' moves and reached ' + stars + '  stars!',
            		type: 'success',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                confirmButtonText: 'Cancel',
            		confirmButtonColor: '#02ccba',
            		confirmButtonText: 'Play again!'
            	}).then(function(isConfirm) {
            		if (isConfirm) {
            			createNewBoard();
            		}
            	});
  				}

  			} else { //in case of a wrong match of two cards, the cards will be reversed back to their back
  				function reverseBackCard(){
  				    var card_1 = document.getElementById(cardIDs[0]);
  				    var card_2 = document.getElementById(cardIDs[1]);
  				    card_1.style.background = 'url(img/chinese.png) no-repeat';
              	    card_1.innerHTML = "";
  				    card_2.style.background = 'url(img/chinese.png) no-repeat';
              	    card_2.innerHTML = "";
  				    // Clear both arrays
  				    cardValues = [];
              cardIDs = [];

          }
  				setTimeout(reverseBackCard, 900); //time for reversing back the cards, in case of a wrong match
          countingMoves += 1;
          //this part is for counting the wrong moves and giving some statements in case of to much wrong moves

          document.getElementById('count').innerHTML = countingMoves;
        }
}
}

}



//Timer for the game
var timer = null,
    interval = 1000,
    value = 0;


$(function() {
    $("#gameBoard").click(function() {
      if (timer !== null) return;
      timer = setInterval(function () {
          $("#seconds").val(++value);
      }, interval);
    });
    $("#stop").click(function() {
        clearInterval(timer);
        timer = null
      });
  });

//Restart Button
function Restart() {
    location.reload();
}
