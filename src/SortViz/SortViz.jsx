import React from 'react';
import {getMergeSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortViz.css';

const ANIMATION_SPEED_MS = 3;

const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    //We have an array stored in the state
    this.state = {
      array: [],
    };
  }

  // This componenents loads for the first time and resetArray is called 
  componentDidMount() {
    this.resetArray();
  }
 
  resetArray() {     // When using the generate new array method
    const array = [];
    for (let i = 0; i < 170; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});   // Then it resets the state
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    //const newAnimation = [];
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    
    
  }

  heapSort() {
    
  }

  bubbleSort() {
    
  }

  render() {
    const {array} = this.state;

    return (
        <div className="array-container">
         {array.map((value, idx) => (
          <div className="array-bar" key={idx} style={{height: `${value}px`}}>
          </div>
         ))}
         <button onClick={() => this.resetArray()}>Generate New Array</button>
         <button onClick={() => this.mergeSort()}>Merge Sort</button>
         <button onClick={() => this.quickSort()}>Quick Sort</button>
         <button onClick={() => this.heapSort()}>Heap Sort</button>
         <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

