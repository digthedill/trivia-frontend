import React from "react"
import { AppBar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const Header = () => {
  return (
    <AppBar position="static" className="appBar">
      <h1>Social Distanced Trivia!</h1>
    </AppBar>
  )
}

export default Header
