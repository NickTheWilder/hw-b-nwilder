import axios from 'axios'
import { Component } from 'react';
import { Table } from 'reactstrap'

class App extends Component {

  state = {
    routes: [],
  }
  //Acccessing Data
  componentWillMount(){
    this._refreshRoutes();
  }

  //Getting Date and Time
  componentDidMount() {
    setInterval(() => {
      this.setState({
        timeHour: new Date().getHours().toLocaleString(),
        timeMin : new Date().getMinutes().toLocaleString(),
      })
      this.getArrivalTimes(this.timeHour, this.timeMin);
    }, 1000)
  }

  //Refreshing the Route
  _refreshRoutes(){
    axios.get('http://localhost:5000/stops').then((response) => {
        this.setState({
          routes: response.data
        })
    });
  }

  getArrivalTimes(timeHour, timeMin, stopID){
    /**
     * Variables passed in
     * - timeHour: Current hour based on Date()
     * - timeMin: Currnet minutes based on Date()
     * - stopID: ID of stop to be returned
     * 
     * TODO: 1. Get the current time
     * 2. Subtract the current time from the Routes 1, 2, & 3 and their current destination time - this gives the arrival times
     * 3. Return the time remaining back to the table
     * 
     * Logic Notes:
     * Every 3 hours the Routes reset/makes a loop
     */
  }

  ///Start MAIN HTML
  render(){
    //Inserting routes into table
    let routes = this.state.routes.map((route) => {
      return(
            <tr key={route.id}>
              <td>{route.id}</td>
              <td>{route.route1_time}</td>
              <td>{route.route2_time}</td>
              <td>{route.route3_time}</td>
            </tr>
          )
    });

    //Formatting main HTML
    return (
      <div className="container">
        <p> Current Time: { this.state.timeHour }:{ this.state.timeMin }</p>
        <p>Stop 1: Route 1 in XX{} minutes</p>
        <p>Stop 2: </p>
        <Table>
            <thead>
              <tr>
                <th>
                  Stops
                </th>
                <th>
                  Route 1 Time
                </th>
                <th>
                  Route 2 Time
                </th> 
                <th>
                  Route 3 Time
                </th>
              </tr>
            </thead>
            <tbody>
              {routes}
            </tbody>
        </Table>
      </div>
    );
  }

}

export default App;
