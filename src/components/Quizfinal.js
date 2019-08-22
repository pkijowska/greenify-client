import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class Quizfinal extends React.Component {

  render() {
    return(
<div>
<button> <Link to={ "/quiz1/"}> Do you think you know plants? </Link></button>
<button> <Link to={ "/quiztest/"}>Check what is your spirit plant? </Link></button>
</div>

    )

}
}

export default Quizfinal;
