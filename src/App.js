import React, { useEffect, useState } from "react"

import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import Header from "./components/Header"
import LoginUser from "./components/LoginInUser"
import GameContainer from "./components/triviaComponents/GameContainer"

import "./App.css"

function App({ socket }) {
  const [user, setUser] = useState("")
  const [room, setRoom] = useState("")
  const [score, setScore] = useState(0)

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
    <Container>
      <Header />
      <div className="game-content">
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {(loggedIn && !gameStarted) || endOfGame ? (
              <Button variant="contained" color="primary" onClick={handleStart}>
                Start Game
              </Button>
            ) : null}

            <GameContainer
              question={question}
              socket={socket}
              user={user}
              score={score}
              setScore={setScore}
            />
            {endOfGame ? <h1>Game Over</h1> : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <div>
              {usersInGame.length ? <h1>Users in {room}</h1> : null}
              {usersInGame.length
                ? usersInGame.map((user, i) => {
                    return (
                      <p key={i}>
                        {user.username} {user.score}
                      </p>
                    )
                  })
                : null}
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default App
