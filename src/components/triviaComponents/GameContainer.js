import React, { useState, useEffect } from "react"
import he from "he"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"

// handle scoring inside the game component

const GameContainer = (props) => {
  const [answer, setAnswer] = useState("")
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false)

  const question = props.question
  const currentQuestionIndex = props.question.index

  const handleAnswer = (e) => {
    const { value } = e.target
    setAnswer(value)
  }

  useEffect(() => {
    if (answeredCorrectly) {
      props.setScore(props.score + 1)
    }
    props.socket.emit("userScore", {
      score: props.score,
      user: props.user,
    })
  }, [currentQuestionIndex])

  useEffect(() => {
    if (answer === question.correct_answer) {
      console.log("correct")
      setAnsweredCorrectly(true)
    } else {
      setAnsweredCorrectly(false)
      console.log(`incorrect it was ${question.correct_answer}`)
    }
  }, [answer])

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
