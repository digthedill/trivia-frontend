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
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          autoComplete={false}
          placeholder="Conan the Barbarian"
          id="standard-basic"
          label="Name"
          name="name"
          value={currentUser}
          onChange={handleUser}
          required
        />
        <TextField
          autoComplete={false}
          placeholder="Tatooine"
          label="Room"
          name="room"
          value={currentRoom}
          onChange={handleRoom}
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default LoginUser
