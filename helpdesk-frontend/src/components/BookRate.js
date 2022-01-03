import React from 'react';

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const BookRate = () => {
  const x =randomIntFromInterval(1,5);
  let rate = "*".repeat(x)
  return <p className="book-rate">{rate}</p>
}

export default BookRate;