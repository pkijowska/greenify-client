let qBank = [{
  question: "What percentage of life is found in the ocean?",
  answers: ["85%", "50%", "75%", "60%"],
  correct: "85%",
  questionID: "1"
},

{
  question: "What country is named after a tree?",
  answers: ["Peru", "Brazil", "Spain", "Portugal"],
  correct: "Brazil",
  questionID: "2"
},

{
  question: "Where does the suicide plant grow?",
  answers: ["Singapoire", "Malaysia", "Australia", "Hong Kong"],
  correct: "Australia",
  questionID: "3"
},

{
  question: "Where was the first founded botanical garden?",
  answers: ["Italy", "San Remo", "Vatican", "France" ],
  correct: "Vatican",
  questionID: "4"

},

{
  question: "One of the below is the name of the flower",
  answers: ["Hooker's Bum", "Hooker's Lips", "Lips of an angel", "Bubblebe Bum"],
  correct: "Hooker's Lips",
  questionID: "5"
},

{
  question: "One of the below is the name of the flower",
  answers: ["Hooker's Bum", "Hooker's Lips", "Lips of an angel", "Bubblebe Bum"],
  correct: "Hooker's Lips",
  questionID: "6"
},
{
  question: "What is the word's fastest growing plant?",
  answers: ["Bamboo", "Sunflower", "Grass", "Daisy"],
  correct: "Bamboo",
  questionID: "7"
}

];
//pich random 4 questions
export default (n = 4) =>
Promise.resolve(qBank.sort(() => 0.5 - Math.random()).slice(0, n));
