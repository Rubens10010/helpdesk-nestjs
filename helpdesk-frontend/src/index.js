import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {books} from './data/books';
import Book from './components/Book'
// Stateless functional component
// always return JSX
function Booklist(){
  return <section className="booklist">
    {books.map(book => {
      return <Book key={book.id} {...book}><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel iusto blanditiis nisi quisquam aperiam. Quidem distinctio fugit laborum praesentium. Cupiditate excepturi corporis quidem sed assumenda mollitia officia, delectus facere ipsa! </p></Book>
    })}
  </section>;
}

ReactDOM.render(
  <React.StrictMode>
    <Booklist/>
  </React.StrictMode>,
  document.getElementById('root')
);