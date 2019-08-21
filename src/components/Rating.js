import React, { Component } from 'react';
import leaf_filled from '../images/leaf_green.png';
import leaf_outline from '../images/leaf_dark.png';

class Rating extends Component {
  constructor (props) {
    super(props);
  }

  render() {

    const rating = [];
    for (let i=0; i < this.props.rating; i++) {
      rating.push(1);
    }
    while (rating.length < 5) {
      rating.push(0);
    }

    return (
      <span className="commentRating">
          {rating.map((r) => {
            if (r === 1) {
              return <img className="ratingImg" src={ leaf_filled } />
            }
            else if (r === 0) {
              return <img className="ratingImg" src={ leaf_outline } />
            }
          })}
      </span>
      )
  }
}

export default Rating;
