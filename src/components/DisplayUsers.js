import React from "react"
import Drawer from "@material-ui/core/Drawer"

const DisplayUsers = ({ usersInGame, room }) => {
  return (
    <Drawer anchor="bottom" variant="permanent" className="sideBar">
      {usersInGame.length ? <h3>Users in {room}</h3> : null}
      {usersInGame.length
        ? usersInGame.map((user, i) => {
            return (
              <p key={i}>
                {user.username} {user.score > 0 ? user.score : null}
              </p>
            )
          })
        : null}
    </Drawer>
  )
}

export default DisplayUsers
