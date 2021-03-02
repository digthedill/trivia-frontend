import React, { useState, useEffect } from "react"
import he from "he"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"

// scoring works except for the first question
// after first question of the round it works...

const GameContainer = (props) => {
  const [answer, setAnswer] = useState("")
  const [correct, setCorrect] = useState(false)
  const question = props.question

  const handleAnswer = (e) => {
    const { value } = e.target
    setAnswer(value)
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
    }
  }, [question])

  console.log(question.correct_answer)
  return (
    <div className="">
      <FormControl component="fieldset">
        <FormLabel component="legend">
          {typeof question === "object" ? he.decode(question.question) : null}
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
      {/*typeof question === "object" ? <p>{score}/10</p> : null */}
    </div>
  )
}

export default GameContainer
