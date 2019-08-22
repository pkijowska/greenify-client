import React, { Component } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import serverURL from "../ServerURL";

const SERVER_URL = serverURL('/plants?name=Venus%20Fly%20Trap');
const SERVER_MARANTA = serverURL('/plants?name=Maranta');
const SERVER_LOTUS = serverURL('/plants?name=Micro%20Lotus');

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
      venus: [],
      maranta: [],
      lotus: []
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

  const fetchingVenus =() => {
    axios.get(SERVER_URL).then((result) => {

      this.setState({venus: result.data});
      console.log(result.data);
    });
  };
  fetchingVenus();

  const fetchingMaranta =() => {
    axios.get(SERVER_MARANTA).then((result) => {

      this.setState({maranta: result.data});
      console.log(result.data);
    });
  };
  fetchingMaranta();


  const fetchingLotus =() => {
    axios.get(SERVER_LOTUS).then((result) => {

      this.setState({lotus: result.data});
      console.log(result.data);
    });
  };
  fetchingLotus();

}

whatPlant() {
     if ((this.state.correct===3) && (this.state.count === 5)) {
       return <div> <h1> Your spirit plant is : {this.state.plantName1} </h1> <p> You are protective, friendly, and people can count on you to get things done! </p>
          <p> Are you interested in renting it out? Click on the picture below: </p>
       <Link to={ "/plants/" + this.state.maranta.id }>
       <Image cloudName="dto4pzoz6" publicId={this.state.maranta.images} width="300" className="allPlantsShow" />
       </Link>
        </div>;

    }
    else if ((this.state.correct===2) && (this.state.count === 5)){
      return <div> <h2> Your spirit plant is: {this.state.plantName2} </h2><p> You're known for being misterious, extremely clever, and a bit shy, too! </p> <p>Are you interested in renting it out? Click on the picture below:</p>
        <Link to={ "/plants/" + this.state.venus.id }>
        <Image cloudName="dto4pzoz6" publicId={this.state.venus.images} width="300" className="allPlantsShow" />
        </Link>

       </div> ;
    }
    else if ((this.state.correct===4 || this.state.correct===1) && (this.state.count === 5)){
      return <div> <h2>Your spirit plant is : You are a lotus flower! </h2> <p>You're beautiful inside and out and known to be quite charismatic and wise! </p> <p>Are you interested in renting it out? Click on the picture below: </p>
      <Link to={ "/plants/" + this.state.lotus.id }>
      <Image cloudName="dto4pzoz6" publicId={this.state.lotus.images} width="300" className="allPlantsShow" />
      </Link>

     </div> ;


    }
    else {
      return
    }


}

  render(){
  return(
    <div>
<h1 class="quiztest"> What is your spirit plant? </h1>
<h3 class="quiztest"> Answer questions below to find out: </h3>
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
          return <button className="answerBtn" onClick={(this.handleClick)} value={option}>{option}</button>
        })
      }
  </div>
  )
}
}


export default Quiztest;
