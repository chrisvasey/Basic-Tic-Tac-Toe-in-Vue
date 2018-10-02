var vm = new Vue({
	el: "#game",
	data: {
		gameStatus: "",
		turn: "",
		lastWinner: "",
		score: {
			p1: 0,
			p2: 0
		},
		squareData: [
			{ id: 1, status: ""},
			{ id: 2, status: ""},
			{ id: 3, status: ""},
			{ id: 4, status: ""},
			{ id: 5, status: ""},
			{ id: 6, status: ""},
			{ id: 7, status: ""},
			{ id: 8, status: ""},
			{ id: 9, status: ""}
		]
	},
	methods: {
		startGame: function(){
			this.gameStatus = "inProgress";
			this.resetGame();
		},
		resetGame : function(){
			for (var i = this.squareData.length - 1; i >= 0; i--) {
				this.squareData[i].status = "";
			}
			this.turn = "player1";
		},
		endTurn : function(){
			if(this.turn == "player1"){
				this.turn = "player2";
			} else {
				this.turn = "player1";
			}
		},
		areEqual : function(){
		   var len = arguments.length;
		   for (var i = 1; i< len; i++){
		      if (arguments[i] === null || arguments[i] !== arguments[i-1])
		         return false;
		   }
		   return true;
		},
		checkDraw : function(){
			blankNo = this.squareData.filter(square => square.status == "").length;
			console.log(blankNo);
			if(blankNo == 0 & this.gameStatus != "gameOver"){
				this.lastWinner = "No one";
				this.gameStatus = "gameOver";
				console.log("Game has drawn");

			}
		},
		checkWin : function(){
			options = [
				//Rows
				rowTop = [1, 2, 3],	
				rowMiddle = [4, 5, 6],	
				rowBottom = [7, 8, 9],

				//Columns
				columnsTop = [1, 4, 7],	
				columnsMiddle = [2, 5, 8],	
				columnsBottom = [3, 6, 9],

				//vert
				LeftRight = [1, 5, 9],
				rightLeft = [3, 5, 7]
			];
			for (var i = options.length - 1; i >= 0; i--) {
				
				option = options[i];

				check1 = this.squareData.filter(square => square.id == option[0]);
				check2 = this.squareData.filter(square => square.id == option[1]);
				check3 = this.squareData.filter(square => square.id == option[2]);

				if(check1[0].status != "", check2[0].status  != "", check3[0].status  != ""){
					if(this.areEqual(check1[0].status, check2[0].status, check3[0].status))
					{
						this.endGame();
					}
				}
				
			}
			//Check for draw
			this.checkDraw();
		},
		endGame : function(){
			this.lastWinner = this.turn;
			this.gameStatus = "gameOver";

			if(this.turn == "player1"){
				this.score.p1++
			} else {
				this.score.p2++
			}
		},
		select: function(square){
			if(this.gameStatus == "inProgress"){
				if(square.status == ""){
					if(this.turn == "player1"){
					square.status = "O";
					} else {
						square.status = "X";
					}
					this.checkWin();
					this.endTurn();
				}
			}
		}
	}
	
});