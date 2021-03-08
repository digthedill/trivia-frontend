import React from "react"
import { AppBar } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import SocialDistancedCats from "../svgs/Social Distancing-01.svg"

const Header = ({ user }) => {
  return (
    <AppBar
      position="static"
      className="appBar"
      style={{ padding: "0 10px 0 10px" }}
    >
      <Grid container justify="center" alignItems="center">
        <Grid item xs>
          <object
            type="image/svg+xml"
            data={SocialDistancedCats}
            style={{ width: "90px" }}
          >
            svg
          </object>
        </Grid>
        <Grid item xs>
          <h1>Social Distanced Trivia!</h1>
        </Grid>

        <Grid item xs>
          <p>{user ? `hello ${user}` : null}</p>
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default Header
