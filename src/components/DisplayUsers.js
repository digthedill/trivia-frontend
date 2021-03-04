import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import PersonIcon from "@material-ui/icons/Person"
import ListItemText from "@material-ui/core/ListItemText"
import { Container } from "@material-ui/core"

const DisplayUsers = ({ usersInGame, room }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Container>
        {usersInGame.length ? (
          <h3>
            {usersInGame.length} users in {room}. Round: {usersInGame[0].round}
          </h3>
        ) : null}
        <List>
          {usersInGame.length
            ? usersInGame.map((user, i) => {
                return (
                  <ListItem key={i}>
                    <ListItemIcon>
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
      </Container>
    </div>
  )
}

export default DisplayUsers
