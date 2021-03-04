import React, { useState, useEffect } from "react"
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

  const decodeHTMLEntities = (text) => {
    var textArea = document.createElement("textarea")
    textArea.innerHTML = text
    return textArea.value
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
          <div style={{ display: "flex" }}>
            <span style={{ marginRight: "0.4rem" }}>
              {parseInt(question.index) <= 9 ? `${question.index + 1}` : null}
            </span>
            <div
              dangerouslySetInnerHTML={{ __html: question.question }}
              style={{ textAlign: "left" }}
            ></div>
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
