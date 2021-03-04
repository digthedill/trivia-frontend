import React, { useState } from "react"

import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
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
          <h1>Are you a leader or a follower?</h1>
          <div style={{ margin: "2rem 0 5rem 0" }}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              value="admin"
              style={{ fontSize: "1.5rem" }}
              onClick={handleUserType}
            >
              Create Trivia Game
            </Button>
          </div>
          <div style={{ marginTop: "5rem" }}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              value="user"
              style={{ fontSize: "1.5rem" }}
              onClick={handleUserType}
            >
              Join a Game
            </Button>
          </div>
        </div>
      ) : (
        <>
          <h2>Let's Play Trivia</h2>
          <form onSubmit={handleSubmit} className="sign-in-form">
            <TextField
              autoComplete="false"
              id="standard-basic"
              label="Name"
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
            <Button type="submit" variant="outlined" className="submit-btn">
              Join
            </Button>
          </form>
        </>
      )}
    </div>
  )
}

export default LoginUser
