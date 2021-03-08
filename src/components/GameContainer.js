import React, { useState, useEffect } from "react"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Fade from "@material-ui/core/Fade"

const GameContainer = (props) => {
  const [answer, setAnswer] = useState("")
  const [showingAnswer, setShowingAnswer] = useState(false)
  const [showRoomAnswer, setShowRoomAnswer] = useState("")
  const [correct, setCorrect] = useState(false)
  const [timer, setTimer] = useState(10)

  const question = props.question

  const handleAnswer = (e) => {
    const { value } = e.target
    setAnswer(value)
  }

  const decodeHTMLEntities = (text) => {
    const textArea = document.createElement("textarea")
    textArea.innerHTML = text
    return textArea.value
  }

  const renderStyles = props.GameContainer
    ? {
        background: "#dbffff",
      }
    : {
        background: "#EDE7F6",
      }

  useEffect(() => {
    if (answer === question.correct_answer) {
      setCorrect(true)
    } else {
      setCorrect(false)
    }
  }, [answer])

  useEffect(() => {
    timer > 0 &&
      setTimeout(() => {
        setTimer(timer - 1)
      }, 980)
  }, [timer])

  //major bug:
  // after rounds -> a point is added

  useEffect(() => {
    if (correct) {
      console.log("emitting user score!")

      props.socket.emit("userScore", {
        score: props.score,
        user: props.user,
        room: props.room,
      })
    }
    return () => {
      setAnswer("")
      setCorrect(false)
      setTimer(10)
    }
  }, [question])

  useEffect(() => {
    setShowingAnswer(false)
    setCorrect(false)
  }, [question])

  useEffect(() => {
    props.socket.on("showAnswer", (answer) => {
      setShowingAnswer(true)
      setShowRoomAnswer(decodeHTMLEntities(answer))
    })
    props.socket.on("clearAnswer", () => {
      setShowRoomAnswer("")
    })
  }, [props.socket])

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Fade in={true} timeout={1000}>
        <Box
          boxShadow={3}
          className="game-container"
          style={renderStyles}
          maxHeight="420px"
          maxWidth="500px"
        >
          <Grid container alignItems="center">
            <Grid item xs>
              {parseInt(question.index) <= 9 ? (
                <h4>{question.category}</h4>
              ) : null}
            </Grid>
            <Grid item>
              <p>{timer}</p>
            </Grid>
          </Grid>
          <FormControl component="fieldset">
            <FormLabel component="legend" className="question-text">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <span className="question-number">
                  {parseInt(question.index) <= 9
                    ? `${question.index + 1}`
                    : null}
                </span>
                <p className="question-text">
                  {decodeHTMLEntities(question.question)}
                </p>
              </div>
            </FormLabel>
            <RadioGroup
              aria-label="answer"
              name="answer"
              value={answer}
              onChange={handleAnswer}
            >
              {typeof question === "object" && question.category !== ""
                ? question.multipleChoice.map((choice, i) => {
                    return (
                      <FormControlLabel
                        value={choice}
                        control={<Radio />}
                        label={decodeHTMLEntities(choice)}
                        key={i}
                        disabled={showingAnswer}
                        color="secondary"
                      />
                    )
                  })
                : null}
            </RadioGroup>
          </FormControl>
          {showingAnswer ? (
            <h2
              style={{
                color: "#F57F17",
                textAlign: "center",
              }}
            >
              {showRoomAnswer}
            </h2>
          ) : null}
        </Box>
      </Fade>
    </div>
  )
}

export default GameContainer
