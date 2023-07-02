import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectAnswer,
    resetChoiceAll,
    redoTest,
    goBack,
    goNext,
    setQuestionCompletion,
    resultReview,
    setShowClose,
    viewResult,
    goToQuestion,
} from '../redux/slices/choiceSlice';
import '../css/choice.css';

export function Choice() {
    const [showReview, setShowReview] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const currentQuestionId = useSelector((state) => state.choice.currentQuestionId);
    const questions = useSelector((state) => state.choice.questions);
    const correctAnswer = useSelector((state) => state.choice.correctAnswer);

    const dispatch = useDispatch();

    const handleAnswerSelect = (questionId, answer) => {
        dispatch(selectAnswer({ questionId, answer }));

        const completed = answer !== '';
        dispatch(setQuestionCompletion({ questionId, completed }));
    };

    const handleResetChoiceAll = () => {
        dispatch(resetChoiceAll());
    };
    const handlePrevious = () => {
        dispatch(goBack());
    };

    const handleNext = () => {
        dispatch(goNext());
    };

    const handleViewResult = () => {
        dispatch(viewResult());
        setShowReview(false);
        setShowAnswer(true);
    };

    const handleSubmit = () => {
        dispatch(resultReview());
        setShowReview(true);
    };

    const setClose = () => {
        setShowReview(false);
        dispatch(setShowClose());
    };

    const handleRedoTest = () => {
        setShowReview(false);
        dispatch(redoTest());
        setShowAnswer(false)
    };

    const allQuestionsCompleted = useMemo(() => {
        return questions.every((question) => question.completed);
    }, [questions])

    const currentQuestion = questions[currentQuestionId];

    return (
        <div className="container">
            <div className="question-status">
                {questions.map((question, index) => (
                    <div
                        key={question.id}
                        className={`question-number ${currentQuestionId === index ? 'active' : (question.completed ? 'completed' : '')}`}
                        onClick={() => dispatch(goToQuestion(index))}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
            <div className='question-container'>
                <div className="question-content">
                    <h2 className={showAnswer ? (currentQuestion.answer === currentQuestion.trueAnswer ? 'correct-answer ' : 'incorrect-answer') : ''}>
                        {showAnswer ? (currentQuestion.answer === currentQuestion.trueAnswer ? 'TRUE' : 'FALSE') : ''}
                    </h2>
                    <h3> Question {currentQuestionId + 1}: {currentQuestion.question}</h3>
                    <ul className="ul">
                        {currentQuestion.options.map((option, index) => (

                            <li key={index} >
                                <label
                                    className={showAnswer
                                        ? currentQuestion.answer === currentQuestion.trueAnswer
                                            ? currentQuestion.answer === option.id
                                                ? 'correct-answer'
                                                : ''
                                            : currentQuestion.trueAnswer === option.id
                                                ? 'correct-answer'
                                                : currentQuestion.answer === option.id
                                                    ? 'incorrect-answer'
                                                    : ''
                                        : currentQuestion.answer === option.id
                                            ? 'selected'
                                            : ''}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestionId}`}
                                        value={option.id}
                                        checked={currentQuestion.answer === option.id}
                                        onChange={() => handleAnswerSelect(currentQuestionId, option.id)}
                                    />
                                    {option.text}
                                </label>
                            </li>
                        ))}
                    </ul>

                </div>
                <div className="block">
                    <button
                        disabled={currentQuestionId === 0}
                        onClick={handlePrevious}
                        className={currentQuestionId === 0 ? 'disable' : 'enable'}
                    >
                        Back
                    </button>
                    <button
                        disabled={currentQuestionId === questions.length - 1}
                        onClick={handleNext}
                        className={currentQuestionId === questions.length - 1 ? 'disable' : 'enable'}
                    >
                        Next
                    </button>
                    {showAnswer ? (
                        <button className='redo' onClick={handleRedoTest}>Redo</button>
                    ) : (
                        <button className={allQuestionsCompleted ? 'submited' : 'submit'} onClick={handleSubmit} disabled={!allQuestionsCompleted}>
                            Submit
                        </button>
                    )}
                    <p onClick={handleResetChoiceAll}>Clear all answer</p>
                    {showReview && (
                        <div className="popup-dialog">
                            <h2>Review</h2>
                            <p>Correct Answer: {correctAnswer}</p>
                            <p>Incorrect Answer: {questions.length - correctAnswer}</p>
                            <div className="button">
                                <button onClick={handleViewResult}>View Result</button>
                                <button onClick={handleRedoTest}>Redo</button>
                                <button onClick={setClose}>Close</button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Choice;