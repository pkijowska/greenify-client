let qBank = [{
  question: "I am calm and collected",
  answers: ["Yes", "No"],
  correct: "Yes",
  questionID: "1"
},

{
  question: "I love meeting new people",
  answers: ["Yes", "No"],
  correct: "No",
  questionID: "2"
},

{
  question: "I like when others touch me",
  answers: ["Yes", "No"],
  correct: "No",
  questionID: "3"
},

{
  question: "I hate sunbathing",
  answers: ["Yes", "No" ],
  correct: "No",
  questionID: "4"

},

{
  question: "I ",
  answers: ["Hooker's Bum", "Hooker's Lips", "Lips of an angel", "Bubblebe Bum"],
  correct: "Hooker's Lips",
  questionID: "5"
},

{
  question: "One of the below is the name of the flower",
  answers: ["Hooker's Bum", "Hooker's Lips", "Lips of an angel", "Bubblebe Bum"],
  correct: "Hooker's Lips",
  questionID: "6"
}

];
//pich random 4 questions
export default (n = 4) =>
Promise.resolve(qBank.sort(() => 0.5 - Math.random()).slice(0, n));
