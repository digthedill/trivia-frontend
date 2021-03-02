import React, { useEffect, useState } from "react"

import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import Header from "./components/Header"
import LoginUser from "./components/LoginInUser"
import GameContainer from "./components/GameContainer"
import DisplayUsers from "./components/DisplayUsers"
import DisplayGameOver from "./components/DisplayGameOver"

import "./App.css"

function App({ socket }) {
  const [user, setUser] = useState("")
  const [room, setRoom] = useState("")

  const [loggedIn, setLoggedIn] = useState(false)
  const [question, setQuestion] = useState("")
  const [usersInGame, setUsersInGame] = useState([])

  const [gameStarted, setGameStarted] = useState(false)
  const [endOfGame, setEndOfGame] = useState(false)

  const handleStart = () => {
    // reset scores
    setGameStarted(true)
    setEndOfGame(false)
    socket.emit("start")
  }

  useEffect(() => {
    socket.on("gameStartedInRoom", () => {
      setEndOfGame(false)
      setGameStarted(true)
    })
    socket.on("timedQuestion", (data) => {
      // console.log(data)
      setQuestion(data)
    })
    socket.on("message", (data) => {
      console.log(data)
    })
    socket.on("roomData", (roomData) => {
      setUsersInGame(roomData.users)
    })

    socket.on("endOfGame", () => {
      setEndOfGame(true)
    })
  }, [socket])

  return (
    <>
      <Container>
        <Header user={user} />
        <DisplayUsers usersInGame={usersInGame} room={room} />
        <Grid container justify="center">
          <div className="game-content">
            {
              endOfGame ? (
                <DisplayGameOver />
              ) : null /*/create a component for this /*/
            }

            {!loggedIn ? (
              <LoginUser
                user={user}
                setUser={setUser}
                room={room}
                setRoom={setRoom}
                setLoggedIn={setLoggedIn}
                socket={socket}
              />
            ) : null}

            {(loggedIn && !gameStarted) || endOfGame ? (
              <div className="center-container">
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={handleStart}
                  className="start-btn"
                >
                  Start Game
                </Button>
              </div>
            ) : null}
            {gameStarted ? (
              <GameContainer
                question={question}
                socket={socket}
                room={room}
                user={user}
                gameStarted={gameStarted}
              />
            ) : null}
          </div>
        </Grid>
      </Container>
    </>
  )
}

export default App
