(function(){
    let game = {
        spaceAvailable : 9,
        board : [
                    ['','', ''],
                    ['','', ''],
                    ['','', '']
                ],
        currentPlayer : false,
        grid : document.querySelector(".game-board"),
        result : document.querySelector(".result"),
        player : document.querySelector(".player"),

        startGame : function(){
            let start = document.querySelector(".start");
            let reset = document.querySelector(".reset");
            start.addEventListener("click",()=>this.gameState(),{once:true});
            reset.addEventListener("click",()=>this.resetBoard());
        },

        displayBoard : function(){
            const cells = this.grid.children;
            Array.from(cells).forEach((cell,idx)=>{
                cell.textContent = this.board[Math.floor(idx/3)][idx%3];
            }) 
            this.handleColour();
            this.handlePlayer();
        },

        handlePlayer : function(){
            this.player.textContent = this.currentPlayer ? `Player 1's turn!` : `Player 2's turn!`;
        },

        handleColour: function(){
            Array.from(this.grid.children).forEach((cell)=>{
                if(cell.textContent==='x') cell.style.color = "#A50034";
                else cell.style.color = "navy";
            })
        },

        gameState : function(){
            if(this.checkWinner()){
                this.result.textContent = `Player ${this.currentPlayer ? 1 : 2} Wins!!`;
                setTimeout(()=>{this.resetBoard()},2000);
            }
            if(this.spaceAvailable>0){
                this.currentPlayer = !this.currentPlayer;
                this.handlePlayer();
                this.playerMove();
            }
            else{
                if(!this.checkWinner()){
                    this.result.textContent = "It's a tie!"
                    setTimeout(()=>{this.resetBoard()},2000);
                }
             }
        },

        playerMove : function(){
            this.grid.addEventListener("click",(e)=>{
              let cell = e.target;
              if(cell.textContent === ''){
                 let idx = Array.from(this.grid.children).indexOf(cell);
                 let row = Math.floor(idx/3);
                 let col = idx%3;
                 this.fillBoard(row,col);
                 }
            }); 
        },

        fillBoard : function(row,col){
            this.board[row][col] = this.currentPlayer ? 'x' : 'o';
            this.spaceAvailable--;
            this.displayBoard();
            this.gameState();
        },

        checkWinner : function(){
            let symbol = this.currentPlayer ? 'x' : 'o';
            for(let i = 0; i<3; i++){
                if((this.board[i][0] === symbol && this.board[i][1] === symbol && this.board[i][2] === symbol) || 
                   (this.board[0][i] === symbol && this.board[1][i] === symbol && this.board[2][i] === symbol)){
                    return true;
                }
            }
            if((this.board[0][0] === symbol && this.board[1][1] === symbol && this.board[2][2] === symbol) ||
                (this.board[0][2] === symbol && this.board[1][1] === symbol && this.board[2][0] === symbol)){
                    return true;
            }
            return false;
        },

        resetBoard : function(){
            this.board = [
                ['','', ''],
                ['','', ''],
                ['','', '']
            ]
            this.spaceAvailable = 9;
            this.currentPlayer = true;
            this.result.textContent = '';
            this.displayBoard();
        }
    }
    game.startGame();
})();

