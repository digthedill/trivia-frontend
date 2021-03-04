import React, { useState, useEffect } from "react"

const DisplayGameOver = ({ socket }) => {
  const [roundWinner, setRoundWinner] = useState([])

  useEffect(() => {
    socket.on("roundWinner", (winner) => {
      console.log("w/n App.js:", winner)
      setRoundWinner(winner)
    })
  }, [socket])

  const renderWinners = (arr) => {
    let winner = ""
    if (arr.length === 1) {
      winner += arr[0].username
    } else if (arr.length === 2) {
      return arr.map((user) => user.username).join(" and ")
    } else {
      return arr.map((user) => user.username).join(", ")
    }
    return winner
  }

  return (
    <div>
      <h1>{renderWinners(roundWinner)} wins!</h1>
    </div>
  )
}

export default DisplayGameOver
