import React, { Component } from 'react';

export class Counter extends Component {
  static displayName = 'Redis Counter';

  constructor (props) {
    super(props);

    this.state = { currentCount: "--" };

    fetch('api/RedisData/CurrentCount')
      .then(response => response.json())
      .then(data =>
      {
        if(data != null) {
          this.setState({ currentCount: data });
        }
        else { 
          this.setState({ currentCount: 0 });
        }
        console.log('currentCount2 = ' + this.state.currentCount);
      });
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter () {
    fetch('api/RedisData/UpdateCount?newCount=' + (this.state.currentCount + 1))
    
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render () {
    return (
      <div>
        <h1>Redis Counter</h1>

        <p>This is a simple example of a connection to Redis to increment and store a counter.</p>

        <p>Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
      </div>
    );
  }
}
