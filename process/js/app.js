var React = require('react');
var ReactDOM = require('react-dom');

var MainInterface = React.createClass({
  render: function() {
    return (
      <div className="interface">
        <h1>Pet Appointments</h1>
        <ul>
          <li>Buffy 3:30PM</li>
          <li>Spot 8:30PM</li>
          <li>Goldie 3:50PM</li>
        </ul>
      </div>
    )
  } //render
}); //MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('petAppointments')
);