import axios from 'axios'
import { Component } from 'react';
import { Table, Button } from 'reactstrap'

class App extends Component {

  state = {
    routes: [],

    editRouteData:{
      id: '',
      route1_time: '',
      route2_time: ''
    },
  }


  //Acccessing Data
  componentWillMount(){
    this._refreshRoutes();
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        timeHour: new Date().getHours().toLocaleString(),
        timeMin : new Date().getMinutes().toLocaleString(),
      })
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
  
  //Editing the route
  editRoute(id, route1_time, route2_time){
    this.setState({
      editRouteData: {id, route1_time, route2_time}
    })
  }
  //*****************************************//
  getArrivalTimes(){
    //LOGIC TO PULL EACH TIME GOES HERE
  }
  //*****************************************//
 
  updateRoute(){
    let{ route1_time, route2_time } = this.state.editRouteData

    axios.put('http://localhost:5000/routes' + this.state.editRouteData, {
      route1_time, route2_time
    }).then((response) => {
        this._refreshRoutes();
    })
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
            </tr>
          )
    });

    //Formatting main HTML
    return (
      <div className="container">
        <p> Current Time: { this.state.timeHour }:{ this.state.timeMin }</p>
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
