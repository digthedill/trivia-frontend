import React, { useEffect, useState } from "react"
import "@fontsource/roboto"

import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Alert from "@material-ui/lab/Alert"
import { ThemeProvider } from "@material-ui/styles"
import Fade from "@material-ui/core/Fade"

import Header from "./components/Header"
import LoginUser from "./components/LoginInUser"
import GameContainer from "./components/GameContainer"
import DisplayUsers from "./components/DisplayUsers"
import DisplayGameOver from "./components/DisplayGameOver"
import CustomTheme from "./theme/CustomTheme"

import WaitingSvg from "./svgs/meditation.svg"
import StartSvg from "./svgs/Focus on positive activities.svg"

import "./App.css"

function App({ socket }) {
  const [user, setUser] = useState("")
  const [room, setRoom] = useState("")
  const [admin, setAdmin] = useState(false)

  const [error, setError] = useState(null)
  const [userObject, setUserObject] = useState({})

  const [loggedIn, setLoggedIn] = useState(false)
  const [question, setQuestion] = useState("")
  const [usersInGame, setUsersInGame] = useState([])

  const [gameStarted, setGameStarted] = useState(false)
  const [endOfGame, setEndOfGame] = useState(false)

  const handleStart = () => {
    setGameStarted(true)
    setEndOfGame(false)
    socket.emit("start")
  }

  useEffect(() => {
    // global emits to server socket.io
    socket.on("error", () => {
      setUser("")
      setRoom("")
      setLoggedIn(false)
      setError("username already claimed!")
    })

    socket.on("userInfo", (user) => {
      setUserObject(user)
    })

    socket.on("gameStartedInRoom", () => {
      setEndOfGame(false)
      setGameStarted(true)
    })
    socket.on("timedQuestion", (data) => {
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
      setGameStarted(false)
    })
  }, [socket])

  // const classes = useStyles()

  return (
    <ThemeProvider theme={CustomTheme}>
      <Fade in={true} timeout={1000}>
        <div className="content">
          <Header user={user} room={room} />
          <Container>
            <Grid>
              {error ? (
                <Alert severity="error" style={{ width: "100%" }}>
                  {error}
                </Alert>
              ) : null}
              <div className="game-content">
                {endOfGame ? <DisplayGameOver socket={socket} /> : null}

                {!loggedIn ? (
                  <LoginUser
                    user={user}
                    setUser={setUser}
                    room={room}
                    setRoom={setRoom}
                    setLoggedIn={setLoggedIn}
                    socket={socket}
                    setError={setError}
                    setAdmin={setAdmin}
                  />
                ) : null}

                {(loggedIn && !gameStarted && admin) || (endOfGame && admin) ? (
                  <Fade in={true} timeout={1000}>
                    <div className="center-container">
                      <object
                        type="image/svg+xml"
                        data={StartSvg}
                        style={{ width: "420px" }}
                      >
                        svg
                      </object>
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
                  </Fade>
                ) : loggedIn &&
                  !gameStarted &&
                  !admin &&
                  userObject.round < 2 ? (
                  <Fade in={true} timeout={1000}>
                    <div className="center-container">
                      <object
                        type="image/svg+xml"
                        data={WaitingSvg}
                        style={{ width: "420px" }}
                      >
                        svg
                      </object>
                      <h3>waiting on admin to start game</h3>
                    </div>
                  </Fade>
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
            <DisplayUsers usersInGame={usersInGame} room={room} />
          </Container>
        </div>
      </Fade>
    </ThemeProvider>
  )
}

export default App
