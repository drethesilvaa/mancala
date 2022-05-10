
let nPits = 6; // number of pits for each user

let nStones = 24;  // number of stones for each user

let gameState = ""

let player1state = ""

let player2state = ""


$(document).ready(function () {
    

    renderPits();

    
    function renderPits(){
        for (let index = 0; index < nPits; index++) {
        
            const stones = Math.floor(nStones/nPits);
    
            appendPit("player-one",stones)
            appendPit("player-two",stones)
        }
    }
   
    function appendPit(player,nStones) { 

        $(".pitsrow."+ player).append("<div class='pit col'><a>"+ nStones +"</a></div>");

    }

    function addScorePit(player,score){
        let nstore = $(".player-"+ player +".store").find("a").text();
        let scoredisplay = parseInt(nstore) + parseInt(score);

        $(".player-"+ player +".store").find("a").text(scoredisplay);

    }

    function changepitvalue(player,index,value) {
        $(".player-"+ player +" .pit:eq("+ index +")").find("a").text(value);
    }

    
    function Getpitvalue(player,index) {
        return $(".player-"+ player +" .pit:eq("+ index +")").find("a").text();
    }

    function checkplayeractive() {
        if(player1state != ""){
            return "Player 1"
        }else if(player2state != ""){
            return "Player 2"
        }
    }

    function checkPits(player){
        let totalscore = 0

        for (let index = 0; index < nPits; index++) {
            let pitvalue = Getpitvalue(player,index);
            
            totalscore = totalscore + parseInt(pitvalue);
            
        }

        return totalscore;
    }

    function resetGame() {

        $(".player-one.store").find("a").text(0);
        $(".player-two.store").find("a").text(0);

        $(".player").removeClass("active");

        if ( $(".player-one .pit").hasClass("inactive")) {
            $(".player-one .pit").removeClass("inactive");
        }
        if ( $(".player-two .pit").hasClass("inactive")) {
            $(".player-two .pit").removeClass("inactive");
        }

        const stones = Math.floor(nStones/nPits);

        $(".player-one .pit").find("a").text(stones);
        $(".player-two .pit").find("a").text(stones);

        player1state = ""
        player2state = ""
    }

    function checkIfGameFinished() {
        
        let _player1score = checkPits("one")
        let _player2score = checkPits("two")

        let player1store = $(".player-one.store").find("a").text();
        let player2store = $(".player-two.store").find("a").text();

        if (_player1score === 0 || _player2score === 0 ) {

           let player1final =  parseInt(player1store) + parseInt(_player1score);
           let player2final = parseInt(player2store) + parseInt(_player2score);


           if (player1final > player2final) GameFinished("Player 1 WIN!")
           if (player1final < player2final) GameFinished("PLAYER 2 WIN")
           if (player1final == player2final) GameFinished("ITS A DRAW")

        }


    }

    function GameFinished(message) {       
        alert(message);
        resetGame();
        
    }

     function changlePlayer(playerID) {

        $(".player").removeClass("active");

        $(".player[data-value='" + playerID +"']").toggleClass("active");

        switch (playerID) {
            case 1:

                $(".player-two .pit").addClass("inactive");

                if ( $(".player-one .pit").hasClass("inactive")) {
                    $(".player-one .pit").removeClass("inactive");
                }
               
                player1state = "playing"
                player2state = ""
                break;
            case 2:

                $(".player-one .pit").addClass("inactive");

                if ( $(".player-two .pit").hasClass("inactive")) {
                    $(".player-two .pit").removeClass("inactive");
                }
                player2state = "playing"
                player1state = ""
                break;

        
            default:
                break;
        }
        
       
     }

     function PlayerOnePlay(pitRocks,pitLocationOnTheBoard) {


        let enemyboardindex = 0;

        for (let index = 0; index < pitRocks; index++) {


            if(pitLocationOnTheBoard == 0){ // He is on the big pit now 
                if (enemyboardindex > 0) {
                    
                    // Landing on player 2 board

                    let pit2index = enemyboardindex - 1;


                    let pit2Value = $(".player-two .pit:eq("+ pit2index +")").find("a").text()

                    pit2Value++; 
                    
                    changepitvalue("two", pit2index, pit2Value);
                    enemyboardindex++;
          

                    // alert("n2-> " +  n2 + ". nPits ->" +nPits);

                    if((enemyboardindex - 1) == nPits){

                        pitLocationOnTheBoard = enemyboardindex-1;

                    }

                    if (index+1 == pitRocks){ 
                        changlePlayer(2)
                    }

                }else{
                    
                    // Landing on the big pit
                    let nstore = $(".player-one.store").find("a").text();
                    nstore++; // put a stone on the big pit
                    $(".player-one.store").find("a").text(nstore);
                    enemyboardindex++;
                    player1state = "Landed on Big Pit"

                }

            }
            else{
                pitLocationOnTheBoard--;
                
                let pit1Value = $(".player-one .pit:eq("+ pitLocationOnTheBoard +")").find("a").text()
               
                if ((pitRocks == index+1)){ 

                    if(pit1Value == 0){
                        let nplayer2pit = $(".player-two .pit:eq("+ pitLocationOnTheBoard +")").find("a").text()

                        if(nplayer2pit > 0){
                            let scoretoadd = parseInt(nplayer2pit) + 1;
                        
                            addScorePit("one",(scoretoadd));

                            changepitvalue("two", pitLocationOnTheBoard, 0);
                            changepitvalue("one", pitLocationOnTheBoard, 0);
                        }
                        else{
                            pit1Value++;
                            changepitvalue("one", pitLocationOnTheBoard, pit1Value)
                        }
                        
                      
                    }
                    else{
                        pit1Value++;
                        changepitvalue("one", pitLocationOnTheBoard, pit1Value);
                    }


                    changlePlayer(2)

                  
                   
                }else{
                    pit1Value++;
                    changepitvalue("one", pitLocationOnTheBoard, pit1Value);
                }

               
            
            }
          
        }

     }

     function PlayerTwoPlay(pitRocks,pitLocationOnTheBoard) {
        let bigpitPosition = nPits - 1;
        let enemyboardindex = nPits;

        for (let index = 0; index < pitRocks; index++) {

                   
            if(pitLocationOnTheBoard == bigpitPosition){ // He is on the big pit now 

                if (enemyboardindex < nPits) {
                    
                    // Landing on player 1 board

                    let pit1index = enemyboardindex;


                    let pit1value = $(".player-one .pit:eq("+ pit1index +")").find("a").text()

                    pit1value++; 
                    
                    changepitvalue("one", pit1index, pit1value);
                    enemyboardindex--;

                    if((enemyboardindex) == -1){

                        pitLocationOnTheBoard = enemyboardindex;

                    }

                    if (index+1 == pitRocks){ 
                        changlePlayer(1) // change turn 
                    }

                }else{
                    
                    // Landing on the big pit

                    let nstore = $(".player-two.store").find("a").text();
                    nstore++; // put a stone on the big pit
                    $(".player-two.store").find("a").text(nstore);
                    enemyboardindex--;
                    player2state = "Landed on Big Pit"
                   
                }

            }
            else{
                pitLocationOnTheBoard++;
                
                let pit2value = $(".player-two .pit:eq("+ pitLocationOnTheBoard +")").find("a").text()                       


                if ((pitRocks == index+1)){ 

                    if(pit2value == 0){
                        let nplayer1pit = $(".player-one .pit:eq("+ pitLocationOnTheBoard +")").find("a").text()

                        if(nplayer1pit > 0){
                            let scoretoadd = parseInt(nplayer1pit) + 1;
                            addScorePit("two",(scoretoadd));
                            changepitvalue("one", pitLocationOnTheBoard, 0);
                            changepitvalue("two", pitLocationOnTheBoard, 0);
                        }
                        else{
                            pit2value++;
                            
                            changepitvalue("two", pitLocationOnTheBoard, pit2value);
                        }

                       
                    }
                    else{
                        pit2value++;
                        changepitvalue("two", pitLocationOnTheBoard, pit2value);
                    }

                    changlePlayer(1)
                   
                }else{
                    pit2value++;
                    changepitvalue("two", pitLocationOnTheBoard, pit2value);
                       
                }

             
            
            }
          
        }


    }

    $(".pit").on("click", function () {


        if($(this).hasClass("inactive") || gameState != "started"){

            if(gameState == "started"){
                let whois = checkplayeractive();
                alert(whois + " time to play"); 
            }     
                   
        }
        else if((player1state === "playing") || (player1state === "Landed on Big Pit")){
            const pitValue = $(this).find("a").text()
            let pitIndex = $(this).index('.player-one .pit');

            PlayerOnePlay(pitValue,pitIndex)
            $(this).find("a").text(0);
        }
        else if((player2state === "playing") || (player2state === "Landed on Big Pit")){

            const pitValue = $(this).find("a").text()
            let pitIndex = $(this).index('.player-two .pit');

            PlayerTwoPlay(pitValue,pitIndex)
            $(this).find("a").text(0);
        }

        checkIfGameFinished();
               
    });

    $("#gamestart").on("click", function () {
        if(gameState == "started"){
             alert("The game already started"); 
        }
        else{
            const rand = Math.round(1 + Math.random() * 1) // Option so the first player is random 
            alert("Player " + rand + " starts");
    
            changlePlayer(rand);
    
            gameState = "started"
        }
      
        

    });

    $("#gamereset").on("click", function () {      
        resetGame()
    });

 


});