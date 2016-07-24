$( document ).ready(function() {
	////////////////////////////
	//Variables/////////
	//////////////////////////////
	//PLAYER
	player = {
	    hp  : 100,
	    ap  : 50,
	    hand : 'nothing'
	};
	playerHp('100');
	playerAp('50');
	//ENEMIES
	var currentEnemy = {
		hp: 0,
		ap : 0,
		hand: 'nothing'
	};
	//enemy list
	var cow = new Enemy("Cow",150,30)
	var dog = new Enemy("Dog",80,20);
	var cat = new Enemy("Cat",50,10);
	var pig = new Enemy("Pig",200,35);
	var enemyList = [];
	enemyList[0] = cow;
	enemyList[1] = dog;
	enemyList[2] = cat;
	enemyList[3] = pig;
	var roundNum = 1;
	var roundLimit = 4;
	//GAMEPLAY AREA
		//setup buttons
		document.getElementById('rock').addEventListener("click", function(){attack('rock')});
		document.getElementById('paper').addEventListener("click", function(){attack('paper')});
		document.getElementById('scissors').addEventListener("click", function(){attack('scissors')});
		//Starts the game
		currentRound();
	////////////////////////////
	//FUNCTIONS/////////
	//////////////////////////////
	//COMBAT
	function attack(playerChoice){
		//Log Choices
		if(player.hp > 0 && currentEnemy.hp > 0){
		enemyHand();
		player.hand = playerChoice;
		log("--You've picked "+player.hand +"<br>"+ "--"+currentEnemy.name+" has picked "+currentEnemy.hand);
		//Picking A Winner
			//PLAYER TIES
			if (player.hand == currentEnemy.hand){
				log("<span style='color:green; font-size: 16px;'>IT'S A TIE</span>");
				}
			//PLAYER WINS
			else if (player.hand == 'paper' && currentEnemy.hand == 'rock' || player.hand == 'scissors' && currentEnemy.hand == 'paper' || player.hand == 'rock'&& currentEnemy.hand == 'scissors'){
				currentEnemy.hp -= player.ap;
				log(currentEnemy.name+" has been hit and now has "+ currentEnemy.hp+" health left");
			}
			//PLAYER LOSES
			else if ( currentEnemy.hand == 'paper' && player.hand == 'rock' || currentEnemy.hand == 'rock' && player.hand == 'scissors' || currentEnemy.hand == 'scissors' && player.hand == 'paper' ){
				player.hp -= currentEnemy.ap;
				playerHp(player.hp);
				log("<span style='color:red; font-size: 16px;'>YOU'VE BEEN HIT<br></span>"+ " You Have "+player.hp+" <span style='color:green;'>Health</span> "+"Left");
			}
			//what happens after hp = 0
			if(currentEnemy.hp <= 0){
				log("<span style='color:red; font-size: 16px;'>NEW ROUND</span>");
				currentRound();
			}
			if(player.hp <= 0){
				log("<span style='color:red; font-size: 16px;'>GAME OVER</span>");
			}
		}
		//scrolls to bottom to show new information
		var objDiv = document.getElementById("adventure-text");
		objDiv.scrollTop = objDiv.scrollHeight;
	}
	//Round Creator
	function currentRound(){
	 if( roundNum <= roundLimit ){
	 	//Set Enemy Stats
	 	setCurrentEnemy(fate(enemyList.length));
	 	log("A "+ currentEnemy.name +" is attacking<br>" +"<span style='color:green;'>Health:</span> "+currentEnemy.hp+"<br>" +"<span style='color:red;'>Attack: </span>"+currentEnemy.ap);
	 }else{
	 	log("<span style='color:green; font-size: 16px;'>YOU WIN</span>");
	 }
	}
	//Enemy hand
	var pick = 0;
	function enemyHand(){
		pick = fate(3);
		if (pick == 0){
			currentEnemy.hand = "rock";
		}else if (pick == 1){
			currentEnemy.hand = "paper";
		}else if (pick == 2){
			currentEnemy.hand = "scissors"; 
		}
	};
	//enemy creator
	function Enemy (name,hp,ap){
		this.name = name;
		this.hp = hp; //health points
		this.ap = ap;//attack points
		this.hand = 'nothing';//RPS choice
	};
	//Setting Current Enemy
	function setCurrentEnemy(id){
		 currentEnemy.name = enemyList[id].name;
		 currentEnemy.hp = enemyList[id].hp;
		 currentEnemy.ap = enemyList[id].ap;
	}
	//log adventure text
	function log(text){
		var textLog = document.getElementById("adventure-text");
		textLog.innerHTML += text + "<br><br>"; 
	}
	//random number
	function fate (num){
		return Math.floor(Math.random()*num);
	}
	//update player stats
	function playerHp(hp){
		document.getElementById('myHealth').innerHTML = hp; 
	}
	function playerAp(ap){
		document.getElementById('myAttack').innerHTML = ap; 

	}
});

