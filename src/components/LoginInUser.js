import React, { useState } from "react"

import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Fade from "@material-ui/core/Fade"

const LoginUser = (props) => {
  const [userType, setUserType] = useState("") //can be 'user' or 'admin'
  const [currentUser, setCurrentUser] = useState("")
  const [currentRoom, setCurrentRoom] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    props.setError(null)
    props.setUser(currentUser)
    setCurrentUser("")
    props.setRoom(currentRoom)
    setCurrentRoom("")
    props.setLoggedIn(true)
    props.setAdmin(formatAdminToBool(userType))
    props.socket.emit("join", {
      room: currentRoom,
      username: currentUser,
      admin: formatAdminToBool(userType),
    })
  }
  const formatAdminToBool = (userType) => {
    return userType === "admin" ? true : false
  }
  const handleUser = (e) => {
    const { value } = e.target
    setCurrentUser(value)
  }
  const handleRoom = (e) => {
    const { value } = e.target
    setCurrentRoom(value)
  }

  const handleUserType = (e) => {
    const { value } = e.currentTarget
    setUserType(value)
  }

  console.log(userType)
  return (
    <div className="form-container">
      {!userType ? (
        <div className="user-select-container">
          <h1>Let's play Trivia</h1>
          <p>Start a new game, or join your buddy's game</p>
          <Button
            color="primary"
            variant="contained"
            size="large"
            value="admin"
            style={{ fontSize: "1rem", margin: "0.3rem" }}
            onClick={handleUserType}
          >
            Create Game
          </Button>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            value="user"
            style={{ fontSize: "1rem", margin: "0.3rem" }}
            onClick={handleUserType}
          >
            Join Game
          </Button>
        </div>
      ) : (
        <Fade in={true} timeout={1000}>
          <div className="user-select-container">
            {formatAdminToBool(userType) ? (
              <h1>Create Game Room</h1>
            ) : (
              <h1>Join Game Room</h1>
            )}
            <form onSubmit={handleSubmit} className="sign-in-form">
              <div className="form-container">
                <TextField
                  autoComplete="false"
                  id="standard-basic"
                  label="Username"
                  name="name"
                  value={currentUser}
                  onChange={handleUser}
                  required
                />
                <TextField
                  autoComplete="false"
                  label="Game Room"
                  name="room"
                  value={currentRoom}
                  onChange={handleRoom}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="submit-btn"
                >
                  Join
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      )}
    </div>
  )
}

export default LoginUser
