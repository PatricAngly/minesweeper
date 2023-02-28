import React from "react";
import createBoard from "./utils";
import CellComponent from "./Cell";
import "./Board.css";

class BoardComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: createBoard(25, 7),
      gameOver: false,
      gameWon: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.boardRef = React.createRef();
    this.restartGame = this.restartGame.bind(this);
  }

  restartGame() {
    this.setState({
      board: createBoard(25, 7),
      gameOver: false,
      gameWon: false,
    });
  }

  checkGameWon() {
    const nonMineCells = this.state.board.filter((cell) => !cell.hasMine); // filter all cells that doesn't have a mine
    if (nonMineCells.every((cell) => cell.visible)) {
      // check if all cells in noMineCells has visible attribute set to true
      this.setState({ gameWon: true }); // if all is true, set gameWon to true
    }
  }

  handleClick(cellindex) {
    if (this.state.gameOver) {
      return;
    }
    // cellindex = index of clicked cell
    const newBoard = [...this.state.board]; // make a copy of 'this.state.board' (to avoid direct manipulation of the state)
    newBoard[cellindex].visible = true; // set visible to true on cell that matches cellindex
    if (newBoard[cellindex].hasMine) {
      // if clicked cell has mine, update gameOver sate to true
      this.setState({ gameOver: true }, () => {
        this.gameOverAnimation();
      });
    } else {
      this.setState({ board: newBoard }, () => {
        // update board state with a new array that includes an update of visible attribute if clicked cell dosen't have a mine
        this.checkGameWon();
      });
    }
  }

  gameOverAnimation() {
    // add a class to gameBoard element
    this.boardRef.current.classList.add("explode");
  }

  render() {
    return (
      <>
        {/* if gmaeOver is true render this */}
        {this.state.gameOver && (
          <div className="gameStatus">
            <p ref={this.boardRef}>Game Over!</p>
            <button className="reloadBtn" onClick={this.restartGame}>
              Click to restart game!
            </button>
          </div>
        )}
        {/* if gmaeWon is true render this */}
        {this.state.gameWon && (
          <div className="gameStatus">
            <p>Congratulations, you won!</p>
            <button className="reloadBtn" onClick={this.restartGame}>
              Click to restart game!
            </button>
          </div>
        )}
        <div className="gameBoard">
          {/* make a CellComponent for every objekt in board by maping*/}
          {this.state.board.map((obj) => (
            <CellComponent
              key={obj.index}
              cell={obj}
              onClick={this.handleClick}
            />
          ))}
        </div>
      </>
    );
  }
}
export default BoardComponent;
