
let nPits = 6; // number of pits for each user

let nStones = 24;  // number of stones for each user

let gameState = ""

let player1state = ""

let player2state = ""


$(document).ready(function () {
    
    for (let index = 0; index < nPits; index++) {
        
        const stones = Math.floor(nStones/nPits);

        appendPit("player-one",stones)
        appendPit("player-two",stones)
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

    function checkplayeractive() {
        if(player1state != ""){
            return "Player 1"
        }else if(player2state != ""){
            return "Player 2"
        }
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

     $("#gamestart").on("click", function () {
        const rand = Math.round(1 + Math.random() * 1) // Option so the first player is random 
        alert("Player " + rand + " starts");

        changlePlayer(rand);

        gameState = "started"
        

     });

     $("#gamereset").on("click", function () {
        
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


     });

     function PlayerOnePlay(pitRocks,pitLocationOnTheBoard) {


        let n2 = 0;

        for (let index = 0; index < pitRocks; index++) {


            if(pitLocationOnTheBoard == 0){ // He is on the big pit now 
                if (n2 > 0) {
                    
                    // Landing on player 2 board

                    let pit2index = n2 - 1;


                    let nnextpit = $(".player-two .pit:eq("+ pit2index +")").find("a").text()

                    nnextpit++; 
                    
                    changepitvalue("two", pit2index, nnextpit);
                    n2++;

                    
                   

                    // alert("n2-> " +  n2 + ". nPits ->" +nPits);

                    if((n2 - 1) == nPits){

                        pitLocationOnTheBoard = n2-1;

                    }

                    if (index+1 == pitRocks){ 
                        changlePlayer(2)
                    }

                }else{
                    
                    // Landing on the big pit
                    let nstore = $(".player-one.store").find("a").text();
                    nstore++; // put a stone on the big pit
                    $(".player-one.store").find("a").text(nstore);
                    n2++;
                    player1state = "Landed on Big Pit"

                }

            }
            else{
                pitLocationOnTheBoard--;
                
                let nprevpit = $(".player-one .pit:eq("+ pitLocationOnTheBoard +")").find("a").text()
               

                // alert("pitRocks: "+pitRocks+"; index: " + (index+1));
                if ((pitRocks == index+1)){ 
                    // alert("landed on own pit")

                    if(nprevpit == 0){
                        let nplayer2pit = $(".player-two .pit:eq("+ pitLocationOnTheBoard +")").find("a").text()

                        if(nplayer2pit > 0){
                            let scoretoadd = parseInt(nplayer2pit) + 1;
                        
                            addScorePit("one",(scoretoadd));

                            changepitvalue("two", pitLocationOnTheBoard, 0);
                            changepitvalue("one", pitLocationOnTheBoard, 0);
                        }
                        else{
                            nprevpit++;
                            changepitvalue("one", pitLocationOnTheBoard, nprevpit)
                        }
                        
                      
                    }
                    else{
                        nprevpit++;
                        changepitvalue("one", pitLocationOnTheBoard, nprevpit);
                    }


                    changlePlayer(2)

                  
                   
                }else{
                    nprevpit++;
                    changepitvalue("one", pitLocationOnTheBoard, nprevpit);
                }

               
            
            }
          
            // alert(nprevpit);
        }
     }

     function PlayerTwoPlay(pitRocks,pitLocationOnTheBoard) {
        let bigpitPosition = nPits - 1;
        let n2 = nPits;

        for (let index = 0; index < pitRocks; index++) {

                   
            if(pitLocationOnTheBoard == bigpitPosition){ // He is on the big pit now 

                if (n2 < nPits) {
                    
                    // Landing on player 1 board

                    let pit1index = n2;


                    let nnextpit = $(".player-one .pit:eq("+ pit1index +")").find("a").text()

                    nnextpit++; 
                    
                    changepitvalue("one", pit1index, nnextpit);
                    n2--;

                    if((n2) == -1){

                        pitLocationOnTheBoard = n2;

                    }

                    if (index+1 == pitRocks){ 
                        changlePlayer(1) // change turn 
                    }

                }else{
                    
                    // Landing on the big pit

                    let nstore = $(".player-two.store").find("a").text();
                    nstore++; // put a stone on the big pit
                    $(".player-two.store").find("a").text(nstore);
                    n2--;
                    player2state = "Landed on Big Pit"

                }

            }
            else{
                pitLocationOnTheBoard++;
                
                let nprevpit = $(".player-two .pit:eq("+ pitLocationOnTheBoard +")").find("a").text()                       


                if ((pitRocks == index+1)){ 

                    if(nprevpit == 0){
                        let nplayer1pit = $(".player-one .pit:eq("+ pitLocationOnTheBoard +")").find("a").text()

                        if(nplayer1pit > 0){
                            let scoretoadd = parseInt(nplayer1pit) + 1;
                            addScorePit("two",(scoretoadd));
                            changepitvalue("one", pitLocationOnTheBoard, 0);
                            changepitvalue("two", pitLocationOnTheBoard, 0);
                        }
                        else{
                            nprevpit++;
                            
                            changepitvalue("two", pitLocationOnTheBoard, nprevpit);
                        }

                       
                    }
                    else{
                        nprevpit++;
                        changepitvalue("two", pitLocationOnTheBoard, nprevpit);
                    }

                    changlePlayer(1)
                   
                }else{
                    nprevpit++;
                    changepitvalue("two", pitLocationOnTheBoard, nprevpit);
                       
                }

             
            
            }
          
            // alert(nprevpit);
        }

    }

     $(".pit").on("click", function () {

        if($(this).hasClass("inactive") || gameState != "started"){
            let whois = checkplayeractive();
            alert(whois + " time to play");        
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
               
     });
     


 


});