import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import PersonIcon from "@material-ui/icons/Person"
import ListItemText from "@material-ui/core/ListItemText"
import Grid from "@material-ui/core/Grid"

import Fade from "@material-ui/core/Fade"

const DisplayUsers = ({ usersInGame, room }) => {
  return (
    <div className="display-users-container">
      <Fade in={true} timeout={1000}>
        <div className="all-users">
          {usersInGame.length ? (
            <Grid container justify="center" alignItems="flex-start">
              <Grid item sm={6} xs={10} className="list-of-users">
                <List>
                  {usersInGame.length
                    ? usersInGame.map((user, i) => {
                        return (
                          <ListItem key={i}>
                            <ListItemIcon>
                              <PersonIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                user.score > 0
                                  ? `${user.username} ${user.score}`
                                  : user.username
                              }
                            />
                          </ListItem>
                        )
                      })
                    : null}
                </List>
              </Grid>
            </Grid>
          ) : null}
        </div>
      </Fade>
    </div>
  )
}

export default DisplayUsers

// <Grid container justify="center">

// </Grid>
