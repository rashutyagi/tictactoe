import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class TicTacToe extends React.Component {
  state = {
    board: ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    turn: "O",
    winner: null,
    draw: false
  };

  handleClick(e) {
    // console.log(e.target.getAttribute('id'))
    const p = e.target.getAttribute("id");
    if (this.state.board[p] !== "-") return;

    const virtualBoard = this.state.board.slice();
    virtualBoard[p] = this.state.turn;

    this.setState({
      board: virtualBoard,
      turn: this.state.turn === "X" ? "O" : "X"
    });
    this.checkWinner(virtualBoard);
  }
  handleReset() {
    this.setState({
      board: ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
      turn: "O",
      winner: null,
      draw: false
    });
  }
  checkWinner(board) {
    if (this.state.winner) return;
    for (let i = 0; i <= 6; i += 3) {
      if (
        board[i] !== "-" &&
        board[i] === board[i + 1] &&
        board[i + 1] === board[i + 2]
      ) {
        console.log(board[i] + " wins");
        this.setState({
          winner: board[i]
        });
        return;
      }
    }
    for (let i = 0; i <= 2; i++) {
      if (
        board[i] !== "-" &&
        board[i] === board[i + 3] &&
        board[i + 3] === board[i + 6]
      ) {
        console.log(board[i] + " wins");
        this.setState({
          winner: board[i]
        });

        return;
      }
    }
    if (board[0] !== "-" && board[0] === board[4] && board[4] === board[8]) {
      console.log(board[0] + " wins");
      this.setState({
        winner: board[0]
      });

      return;
    }

    if (board[2] !== "-" && board[2] === board[4] && board[4] === board[6]) {
      console.log(board[2] + " wins");
      this.setState({
        winner: board[2]
      });

      return;
    }
    if (!board.includes("-")) {
      this.setState({
        draw: true
      });
    }
  }

  render() {
    return (
      <div>
        <h1> Tic Tac Toe </h1>
        {this.state.board.map((value, index) => {
          if ((index + 1) % 3 === 0) {
            return (
              <React.Fragment key={index}>
                <button
                  disabled={!!this.state.winner}
                  onClick={e => this.handleClick(e)}
                  id={index}
                >
                  {value}
                </button>
                <br />
              </React.Fragment>
            );
          }

          return (
            <button
              disabled={!!this.state.winner}
              onClick={e => this.handleClick(e)}
              key={index}
              id={index}
            >
              {value}
            </button>
          );
        })}
        {this.state.draw && <p>its a draw</p>}
        {this.state.winner && <p>{this.state.winner} wins </p>}

        {(this.state.winner || this.state.draw) && (
          <button onClick={() => this.handleReset()}>Reset</button>
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<TicTacToe />, rootElement);
