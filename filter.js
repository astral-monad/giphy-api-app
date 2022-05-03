import React, { Component } from 'react';

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'G'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your chosen rating is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Rating:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="Y">Y</option>
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export { Rating }