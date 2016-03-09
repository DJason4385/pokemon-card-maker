import React, { Component } from 'react';
import {render} from 'react-dom';
import styles from './style.css';
import config from './config.json';
// import content from './content';


const Greeter = () => {
  return (
    <div className={styles.root}>
      {config.greetText}
    </div>
  );
}

render(<Greeter />, document.getElementById('root'));
