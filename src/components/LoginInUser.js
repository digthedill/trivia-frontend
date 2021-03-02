import React, { useState } from "react"

import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
const LoginUser = (props) => {
  const [currentUser, setCurrentUser] = useState("")
  const [currentRoom, setCurrentRoom] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    props.setUser(currentUser)
    setCurrentUser("")
    props.setRoom(currentRoom)
    setCurrentRoom("")
    props.setLoggedIn(true)
    props.socket.emit("join", {
      room: currentRoom,
      username: currentUser,
    })
  }

  const handleUser = (e) => {
    const { value } = e.target
    setCurrentUser(value)
  }
  const handleRoom = (e) => {
    const { value } = e.target
    setCurrentRoom(value)
  }
  return (
    <div className="form-container">
      <h2>Let's Play Trivia</h2>
      <form onSubmit={handleSubmit} className="sign-in-form">
        <TextField
          autoComplete={false}
          id="standard-basic"
          label="Name"
          name="name"
          value={currentUser}
          onChange={handleUser}
          required
        />
        <TextField
          autoComplete={false}
          label="Room"
          name="room"
          value={currentRoom}
          onChange={handleRoom}
          required
        />
        <Button type="submit" variant="outlined" className="submit-btn">
          Join
        </Button>
      </form>
    </div>
  )
}

export default LoginUser
