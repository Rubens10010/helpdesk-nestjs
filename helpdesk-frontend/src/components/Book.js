import React from 'react';
import BookRate from './BookRate';

const Book = (props) => {
  const {image_url, title, author, children} = props;
  const clickHandler = (e) => {
    console.log(e)
    alert("buyed");
  }

  return <article className="book" onMouseOver={()=> {
  }}>
    <img src={image_url} alt="bookcover" height="250"/>
    <h1>{title}</h1>
    <h4 style={{letterSpacing: '1px'}}>{author}</h4>
    <BookRate/>
    {children}
    <button type="button" onClick={clickHandler}>Buy me!</button>
  </article>
}

export default Book;