import React from "react"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import PersonIcon from "@material-ui/icons/Person"
import ListItemText from "@material-ui/core/ListItemText"
import { Container } from "@material-ui/core"

const DisplayUsers = ({ usersInGame, room }) => {
  return (
    <Drawer variant="permanent" anchor="bottom">
      <Container>
        {usersInGame.length ? <h3>Users in {room}</h3> : null}
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
    </Drawer>
  )
}

export default DisplayUsers
