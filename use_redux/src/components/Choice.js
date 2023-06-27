import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAnswer, resetChoiceAll, goBack, goNext, setQuestionCompletion, resultReview, setShowClose } from '../redux/slices/choiceSlice'
import '../css/choice.css'

export function Choice() {
    const [showReview, setShowReview] = useState(false);
    const currentQuestionId = useSelector((state) => state.choice.currentQuestionId)
    const questions = useSelector((state) => state.choice.questions)
    const completed = useSelector((state) => state.choice.completed)
    const correctAnswer = useSelector((state) => state.choice.correctAnswer)

    const dispatch = useDispatch()

    const handleAnswerSelect = (questionId, answer) => {
        dispatch(selectAnswer({ questionId, answer }));

        const completed = answer !== '';
        dispatch(setQuestionCompletion({ questionId, completed }))
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
        dispatch(resultReview());
        setShowReview(true);
    }

    const setClose = () => {
        setShowReview(false);
        dispatch(setShowClose())
    }

    const allQuestionsCompleted = questions.every((question) => question.completed);
    const currentQuestion = questions[currentQuestionId];

    return (
        <div className='container'>
            <div className='content'>
                <h3> Question {currentQuestionId + 1}</h3>
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
                    className={currentQuestionId === 0 ? "disable" : "enable"}
                >Back</button>
                <button
                    disabled={currentQuestionId === questions.length - 1}
                    onClick={handleNext}
                    className={currentQuestionId === questions.length - 1 ? "disable" : "enable"}
                >Next</button>

                <button
                    className={allQuestionsCompleted ? "submited" : "submit"}
                    onClick={handleSubmit}
                    disabled={!allQuestionsCompleted}
                >Submit</button>
                <p onClick={handleResetChoiceAll}>Clear all answer</p>
                {showReview &&
                    <div className='popup-dialog'>
                        <h2>Review</h2>
                        <p>Correct Answer:{correctAnswer}</p>
                        <p>Incorrect Answer:{questions.length - correctAnswer}</p>
                        <button onClick={setClose}>Close</button>
                    </div>
                }
            </div>
        </div>
    );
};


export default Choice;