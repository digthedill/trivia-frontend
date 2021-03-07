import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import PersonIcon from "@material-ui/icons/Person"
import ListItemText from "@material-ui/core/ListItemText"
import Container from "@material-ui/core/Container"
import Fade from "@material-ui/core/Fade"

const DisplayUsers = ({ usersInGame, room }) => {
  return (
    <div className="display-users-container">
      <Fade in={true} timeout={1000}>
        <div className="all-users">
          {usersInGame.length ? (
            <div>
              <h3>
                {usersInGame.length} users in {room}. Round:{" "}
                {usersInGame[0].round}
              </h3>
              <List>
                {usersInGame.length
                  ? usersInGame.map((user, i) => {
                      return (
                        <ListItem key={i}>
                          <ListItemIcon style={{ color: "#fff" }}>
                            <PersonIcon />
                          </ListItemIcon>
                          <ListItemText>
                            {user.username} {user.score > 0 ? user.score : null}
                          </ListItemText>
                        </ListItem>
                      )
                    })
                  : null}
              </List>
            </div>
          ) : null}
        </div>
      </Fade>
    </div>
  )
}

export default DisplayUsers
