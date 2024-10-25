(function(){
    let game = {
        spaceAvailable : 9,
        board : [
                    ['','', ''],
                    ['','', ''],
                    ['','', '']
                ],
        currentPlayer : true,
        displayBoard : function(){
            console.log(this.board);
            if(this.spaceAvailable>0){
               this.playerMove();
            } 
            else{
                alert("It's a tie!");
                this.resetBoard();
            }
        },
        playerMove : function(){
            let row, col;
            while(true){
                row = Number(prompt("Enter a row [0-2]"));
                col = Number(prompt("Enter a column [0-2]"));

                if(row>=0 && row<=2 && col>=0 && col<=2 && this.board[row][col]===''){
                    break;
                } else{
                    alert("Invalid move! Please enter an empty space between [0-2]");
                }
            }
            this.fillBoard(row,col);
        },
        fillBoard : function(row,col){
            this.board[row][col] = this.currentPlayer ? 'x' : '0';
            this.spaceAvailable--;
            if(this.checkWinner()){
                this.resetBoard()
            }
            else{
                this.currentPlayer = !this.currentPlayer;
                this.displayBoard();
            }
        },
        checkWinner : function(){
            let symbol = this.currentPlayer ? 'x' : '0';
            for(let i = 0; i<3; i++){
                if((this.board[i][0] === symbol && this.board[i][1] === symbol && this.board[i][2] === symbol) || 
                   (this.board[0][i] === symbol && this.board[1][i] === symbol && this.board[2][i] === symbol)){
                    console.log(this.board);
                    alert(`Player ${symbol} Wins!!`);
                    return true;
                }
            }
            if((this.board[0][0] === symbol && this.board[1][1] === symbol && this.board[2][2] === symbol) ||
                (this.board[0][2] === symbol && this.board[1][1] === symbol && this.board[2][0] === symbol)){
                    console.log(this.board);
                    alert(`Player ${symbol} Wins!!`);
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

            console.log(this.board);
            let reply = prompt("Play again?", "yes");
            if(reply === 'yes'){
                this.displayBoard();
            }
        }
    }
    game.displayBoard();
})();