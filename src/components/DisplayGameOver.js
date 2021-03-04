import React from "react"
import Animated from "../growth 2.svg"
// have a on tally scores

// display the winner
const DisplayGameOver = ({ roundWinner }) => {
  return (
    <div>
      <h1>{roundWinner} wins!</h1>

      <object type="image/svg+xml" data={Animated} style={{ width: "420px" }}>
        svg animation
      </object>
    </div>
  )
}

export default DisplayGameOver
