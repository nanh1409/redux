import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAnswer, resetChoiceAll, goBack, goNext } from './choiceSlice'
import '../css/choice.css'

export function Choice() {
    const currentQuestionId = useSelector((state) => state.choice.currentQuestionId)
    const questions = useSelector((state) => state.choice.questions)
    const dispatch = useDispatch()

    const handleAnswerSelect = (questionId, answer) => {
        dispatch(selectAnswer({ questionId, answer }));
    };

    const handleResetChoiceAll = () => {
        dispatch(resetChoiceAll());
    }

    const handlePrevious = () => {
        dispatch(goBack());
    };

    const handleNext = () => {
        dispatch(goNext());
    };

    const handleSubmit = () => {
        console.log(questions)
    }

    const currentQuestion = questions[currentQuestionId];

    return (
        <div className='container'>
            <div className='content'>
                <h3> Question {currentQuestionId + 1}</h3>
                <p>{currentQuestionId.questionId}</p>
                <ul className='ul'>
                    {currentQuestion.options.map((option, index) => (
                        <li
                            key={index}
                        >
                            <label>
                                <input
                                    type="radio"
                                    value={option}
                                    checked={currentQuestion.answer === option}
                                    onChange={() => handleAnswerSelect(currentQuestionId, option)}
                                    className={currentQuestion.answer === option ? "selected" : ""}
                                />

                                {option}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='block'>
                <button
                    disabled={currentQuestionId === 0}
                    onClick={handlePrevious}
                >Back</button>
                <button
                    disabled={currentQuestionId === questions.length - 1}
                    onClick={handleNext}
                >Next</button>
                <button onClick={handleSubmit}>Submit</button>
                <p onClick={handleResetChoiceAll}>Clear all answer</p>
            </div>
        </div>
    );
};


export default Choice;