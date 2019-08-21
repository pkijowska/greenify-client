import React, { useState } from 'react';

const QuestionBox = ({ question, options, selected }) => {
  const [answer, setAnswer] = useState(options);
  //setanswer refers to a function that can be used to update the value of the answer variable. With this in place, I will use the map function on the answer variable to render a series of buttons
  return (
    <div className="questionBox">
    <div className="question"> {question} </div>
    {answer.map((text, index) => (
      <button key={index} className="answerBtn" onClick={()=> {
        setAnswer([text]);
        selected(text);
      }}
        >
        {text}
      </button>
    ))}
    </div>
  );
}

export default QuestionBox;
