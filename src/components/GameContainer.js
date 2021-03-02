import React, { useState, useEffect } from "react"
import he from "he"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"

const GameContainer = (props) => {
  const [answer, setAnswer] = useState("")
  const [correct, setCorrect] = useState(false)
  const question = props.question

  const handleAnswer = (e) => {
    const { value } = e.target
    setAnswer(value)
  }

  const renderStyles = props.GameContainer
    ? {
        background: "#dbffff",
      }
    : {
        background: "white",
      }

  useEffect(() => {
    if (answer === question.correct_answer) {
      setCorrect(true)
    } else {
      setCorrect(false)
    }
  }, [answer])

  useEffect(() => {
    if (correct) {
      console.log("correct!")
      props.socket.emit("userScore", {
        score: props.score,
        user: props.user,
        room: props.room,
      })
    }
    return () => {
      setAnswer("")
      setCorrect(false)
    }
  }, [question])

  return (
    <div className="game-container" style={renderStyles}>
      {parseInt(question.index) <= 9 ? <h4>{question.category}</h4> : null}
      <FormControl component="fieldset">
        <FormLabel component="legend" className="question-text">
          <p>
            {parseInt(question.index) <= 9 ? `${question.index + 1} .` : null}
            {he.decode(question.question)}
          </p>
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
                    label={he.decode(choice)}
                    key={i}
                  />
                )
              })
            : null}
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default GameContainer
