var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var AptList = require('./AptList');
var AddAppointment = require('./AddAppointment');
var SearchAppointments = require('./SearchAppointments');

var MainInterface = React.createClass({
  getInitialState: function(){
    return {
      aptBodyVisible: false,
      orderBy: 'petName',
      orderDir: 'asc',
      queryText: '',
      myAppointments: []
    } // Return
  }, // getInitialState

  componentDidMount: function(){
    this.serverRequest = $.get('./js/data.json', function(result){
      var tempApts = result;
      this.setState({
        myAppointments: tempApts
      }); //setState
    }.bind(this));
  }, //componentDidMount

  componentWillUnmount: function(){
    this.serverRequest.abort();
  }, //componentWillUnmount

  deletMessage: function(item){
    var allApts = this.state.myAppointments;
    var newApts = _.without(allApts, item);
    this.setState({
      myAppointments: newApts
    }); //setState
  }, //deleteMessage

  toggleAddDisplay: function(){
    var tempVisibility = !this.state.aptBodyVisible;
    this.setState({
      aptBodyVisible: tempVisibility
    }); //setState
  }, //toggleAddDisplay

  addItem:function(tempItem){
    var tempApts = this.state.myAppointments;
    tempApts.push(tempItem);
    this.setState({
      myAppointments: tempApts
    });//setState
    this.toggleAddDisplay();
  },//addItem

  reOrder: function(orderBy, orderDir) {
    this.setState({
      orderBy: orderBy,
      orderDir: orderDir
    });
  },

  searchApts: function(q){
    this.setState({
      queryText: q
    });
  },

  render: function() {
    var filteredApts = [];
    var orderBy = this.state.orderBy;
    var orderDir = this.state.orderDir;
    var queryText = this. state.queryText;
    var myAppointments = this.state.myAppointments;

    myAppointments.forEach(function(item){
      if(
        (item.petName.toLowerCase().indexOf(queryText) != -1) ||
        (item.ownerName.toLowerCase().indexOf(queryText) != -1) ||
        (item.aptDate.toLowerCase().indexOf(queryText) != -1) ||
        (item.aptNotes.toLowerCase().indexOf(queryText) != -1) 
        ) {
        filteredApts.push(item);
      }
    });

    filteredApts = _.orderBy(filteredApts, function(item){
      return item[orderBy].toLowerCase();
    }, orderDir);

    filteredApts = filteredApts.map(function(item, index){
      return (
        <AptList key = {index}
            singleItem = {item}
            whichItem = {item}
            onDelete = {this.deletMessage} />
      ) // return
    }.bind(this)); // filteredApts.map

    return (
      <div className="interface">
        <AddAppointment 
          bodyVisible = {this.state.aptBodyVisible}
          handleToggle = { this.toggleAddDisplay }
          addApt = { this.addItem }
        />

        <SearchAppointments 
        orderBy = { this.state.orderBy }
        orderDir = { this.state.orderDir } 
        onReOrder = {this.reOrder }
        onSearch = {this.searchApts}/>

        <ul className="item-list media-list">
          {filteredApts}
        </ul>
      </div>
    ) //return
  } //render
}); //MainInterface


ReactDOM.render(
  <MainInterface />,
  document.getElementById('petAppointments')
);