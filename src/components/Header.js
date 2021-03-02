import React from "react"
import { AppBar } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
const Header = ({ user }) => {
  return (
    <AppBar position="static" className="appBar" style={{ padding: "10px" }}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <h1>Social Distanced Trivia!</h1>
        </Grid>
        <Grid item justify="flex-end">
          <p>{user ? `welcome ${user}` : null}</p>
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default Header
