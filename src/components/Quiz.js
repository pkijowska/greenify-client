import React, { Component } from 'react';
import ReactDOM from "react-dom";
import quizService from "../quizService";
import QuestionBox from "./QuestionBox";
import serverURL from "../ServerURL";
import Result from "./Result";

class Quiz extends Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0,

  };

//invokes quizzService API and proceeds to populate the questionBank state variable with the results.



  break;




getQuestions = () =>{
  quizService().then(question => {
    this.setState({
      questionBank: question
    });
  });
};


computeAnswer = (answer, correctAnswer) => {
  if (answer === correctAnswer) {
this.setState({
  score: this.state.score + 1
    });
  }
  this.setState({
    responses: this.state.responses < 4 ? this.state.responses + 1 : 5
  });
};

playAgain = () => {
this.getQuestions();
this.setState({
  score: 0,
  responses: 0
    });
  };

//we used the componentDidMount lifecycle method to bring in a set of question objects from our API and we populated a state variable with this data. We then render the question text from this data in our JSX template
componentDidMount() {
  this.getQuestions();
}

  render() {
    return (
      <div className="container">

      <div className="title"> Quiz </div>
        {this.state.questionBank.length > 0 && this.state.responses < 4 && this.state.questionBank.map(({question, answers, correct, questionID}) => (<QuestionBox question={question} options={answers} key={questionID} selected={answer => this.computeAnswer(answer, correct)}/>
        )
      )}

      {this.state.responses === 4 ? (<Result score={this.state.score} playAgain={this.playAgain} />) : null }
      </div>
    );
  }
}

ReactDOM.render(<Quiz />, document.getElementById("root"));

export default Quiz;
