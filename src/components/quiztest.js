import React, { Component } from 'react';
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(){
    super()
    this.state={
      data:[
        {
          question: "Do you prefer a cosy night in or an adventourous night out?",
          options: ["A cosy night in", "Adventourous night out"],
          answer:'A cosy night in' },
          {
            question: "Which season do you prefer?",
            options: ["Summer", "Winter"],
            answer:'Summer' },
            {
              question: "Which of the following do you thing better suit you?",
              options: ["Charming", "Misterious"],
              answer:'Misterious' },
        {
          question:"Do you like standing out from the crowd?",
          options:["Yes", "No"],
          answer:'Yes'},
        {
            question:"Do you like cuddles?",
            options:["Yes", "No"],
            answer:'No'}

      ],
      count:0,
      correct:0,
      inCorrect:0
    }

    this.whatPlant=this.whatPlant.bind(this);
  }
  handleResult=(isCorrect)=>{
    if(isCorrect){
      this.setState((prevState)=>({
      correct:prevState.correct+1,
      count:prevState.count+1
    }))
    }else{
      this.setState((prevState)=>({
      inCorrect:prevState.inCorrect+1,
      count:prevState.count+1
    }))
  }


}
whatPlant() {
     if ((this.state.correct===3) && (this.state.count === 5)) {
       return <h1> You are venus flytrap </h1>;
    }
    else if ((this.state.correct===2) && (this.state.count === 5)){
      return <h1> You are a succulent </h1> ;
    }
    else if ((this.state.correct===4) && (this.state.count === 5)){
      return <h1> You are a micro Lotus </h1> ;
    }
    else {
      return
    }


}

  render(){
  return(
    <div>
      {(this.state.count<5) && <Layout
        question={this.state.data[this.state.count].question}
        options={this.state.data[this.state.count].options}
        answer={this.state.data[this.state.count].answer}
        correct={this.state.correct}
        inCorrect={this.state.inCorrect}
        handleResult={this.handleResult} />}


    {this.whatPlant()}
      <h2>Correct:{this.state.correct}</h2>
      <h2>InCorrect:{this.state.inCorrect}</h2>
    </div>
  )
}
}
class Layout extends React.Component{
  constructor(props){
    super(props)
  }
  handleClick = (e) =>{
    if(e.target.value===this.props.answer){
      this.props.handleResult(true)
    }else{
      this.props.handleResult(false)
    }
  }
  render (props){
  return(
  <div>
      <h2>{this.props.question}</h2>
      {
        this.props.options.map(option=>{
          return <button onClick={(this.handleClick)} value={option}>{option}</button>
        })
      }
  </div>
  )
}
}
ReactDOM.render(
        <App/>,
        document.getElementById("root")
    )

export default App;
