import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class Quizfinal extends React.Component {

  render() {
    return(
      <div>
      <h1 className="quiztest"> Quiz time </h1>
      <div className="container">
        <div className="card-container">
            <div className="card">
              <div className="front">
                <div className="card-img">
                 <img src="https://images.unsplash.com/photo-1518008931783-51b25ba2ccc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="ccr" />
                </div>
                <div className="card-body">
                  <h3>What plant are you?</h3>
                </div>
              </div>
              <div className="back">
                <p className="pelBack">What is your spirit plant?</p>
        <p className="pelBack">Answer questions to find out and check what plant suit your personality!</p>

                <br />
                <button className="flipbutton"><Link to={ "/quiztest/"}> Take me to the quiz! </Link></button>
              </div>
            </div>
        </div>

        <div className="card-container em">
          <div className="card">
            <div className="front">
                <div className="card-img">
                 <img src="https://images.unsplash.com/photo-1494516192674-b82b5f1e61dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="ccr" />
                </div>
                <div className="card-body">
                  <h3>How green is your thumb?</h3>
                </div>
            </div>
            <div className="back">
                <p className="pelBack">Did you know there are 391,000 plant species in the world?</p><p className="pelBack"> Check your knowledge on plants! </p>

                <button className="flipbutton"><Link to={ "/quiz1/"}> Take me to the quiz! </Link></button>
            </div>
          </div>
        </div>
        </div>
        </div>


    )

}
}

export default Quizfinal;
