import React, { Component } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import serverURL from "../ServerURL";

const SERVER_URL = serverURL('plants/58.json');

class Quiztest extends React.Component {
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
      inCorrect:0,
      plantName2: "Venus Flytrap",
      plantName1: "Maranta",
      plants: []
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

  const fetchingPlants =() => {
    axios.get(SERVER_URL).then((result) => {

      this.setState({plants: result.data});
      console.log(result.data);
    });
  };
  fetchingPlants();
}

whatPlant() {
     if ((this.state.correct===3) && (this.state.count === 5)) {
       return <p> Your spirit plant is : {this.state.plantName1} . You are protective, friendly, and people can count on you to get things done! </p>;

    }
    else if ((this.state.correct===2) && (this.state.count === 5)){
      return <div> Your spirit plant is :{this.state.plantName2} You're known for being misterious, extremely clever, and a bit shy, too!
        <Link to={ "/plants/58" }>
        <Image cloudName="dto4pzoz6" publicId={this.state.plants.images} width="300" className="allPlantsShow" />
        </Link>

       </div> ;
    }
    else if ((this.state.correct===4) && (this.state.count === 5)){
      return <h1> You are a lotus flower! You're beautiful inside and out and known to be quite charismatic and wise! </h1> ;

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


export default Quiztest;
