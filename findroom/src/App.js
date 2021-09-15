import React,{Component} from "react";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./components/Login"
import axios from 'axios';
import {Home} from './components/Home';
import LandlordRegister from "./components/LandlordRegistration/LandlordRegister"
import DetailRoomPage from "./components/DetailRoomPage";
import WatchPage from "./components/WatchPage";
import VideoChat from "./components/VideoChat"
class App extends Component {
  state={}
  componentDidMount = () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }

    axios
      .get('http://localhost:5000/' + localStorage.getItem('id'), config)
      .then(
        (res) => {
          if(res.data.email!=null)
          {
            localStorage.setItem("email",res.data.email);
            localStorage.setItem("person",res.data.person);
          }
          
          this.setUser(res.data)
        },
        (err) => {
          console.log(err)
        }
      )
  }

  setUser = (user) => {
    this.setState({
      user: user,
    })
  }



  render(){
  return (
    <div >
   <Router>
          <Navbar user={this.state.user} setUser={this.setUser} />

          <Switch>
          <Route
              exact
              path='/'
              component={() => <Home user={this.state.user} />}
            />
            <Route
              exact
              path='/landlord'
              component={() => <LandlordRegister user={this.state.user} />}
            />

          <Route
              exact
              path='/login'
              component={() => <Login setUser={this.setUser}/>}
            />
            <Route exact path='/video' render={(props) => <VideoChat {...props}/>} />
          <Route exact path='/watch' component={WatchPage} />
            <Route exact path='/register' component={Signup} />
            <Route exact path='/room/:id' key={window.location.pathname} component={DetailRoomPage} />
            </Switch>
        </Router>
   </div>
  );
}
}

export default App;
