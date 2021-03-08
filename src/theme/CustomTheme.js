import { createMuiTheme } from "@material-ui/core/styles"
import deepPurple from "@material-ui/core/colors/deepPurple"
import yellow from "@material-ui/core/colors/yellow"

const CustomTheme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: yellow[900],
    },
  },
  // overrides: {
  //   MuiFormControlLabel: {
  //     label: {
  //       color: yellow[900],
  //     },
  //   },
  // },
})

export default CustomTheme
