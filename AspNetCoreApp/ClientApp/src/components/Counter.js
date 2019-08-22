import React, { Component } from 'react';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor (props) {
    super(props);
    fetch('api/RedisData/CurrentCount')
      .then(response => {
        console.log('response = "' + response + '"');
        if(response != null)
          this.setState({ currentCount: response });
        else 
          this.setState({ currentCount: 0 });
      })
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter () {
    fetch('api/RedisData/UpdateCount?newCount=' + this.state.currentCount + 1)
    
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render () {
    return (
      <div>
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p>Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
      </div>
    );
  }
}
