import React,{Component} from "react";
import svg1 from "./images/svg1.svg";
import Styled from "styled-components";
import axios from 'axios';
import { Redirect } from 'react-router';
import {Register}from "./Signup"
class Login extends Component{

    state={
        credentials:{name:'',password:''},
        message:'',
        loggedIn:false,
      };

      login=event=>{
        event.preventDefault();
       
         
     //   console.log(this.state.credentials);
        
        var data=this.state.credentials;
        axios.post('http://localhost:5000/login',data).then(
            res=>{
               // console.log(res)
               localStorage.setItem('token',res.data.token);  
               localStorage.setItem('name',res.data.name); 
               localStorage.setItem('id',res.data.id);

                this.setState({
                  loggedIn:true
                })
                this.props.setUser(res.data);   
               
            }).catch(
              
                err=>{
                  console.log(err.response);
                
      
                },
                
        )
              }
              inputChanged= event=>{
      
                //console.log(event.target.name);
                this.statechanged(event.target.name,event.target.value)
              }

              statechanged= (names,value)=>{
    
                const cred=this.state.credentials;
               cred[names]=value;
                //console.log(cred);
                this.setState({credentials:cred});
              }

    render(){
        if(this.state.loggedIn)
        {
            return <Redirect to="/" />;
        }


        return(
            <div style={{backgroundColor:"#00ac96"}}>
                <Register>
                <div className="container" style={{paddingTop:5,paddingBottom:40}}>
                
                    <div className="row content" >
                     
                        <div className="col-md-6 mb-3">
                            <img src={svg1} style={{height:400,width:400}} className="img-fluid" />
                        </div>
                        <div className="col-md-6">
                            <h2 className="signin-text mb-3">
                               Login
                            </h2>
                          
                              
                                <div className="form-group">
                                    <label htmlFor="name" name="name">
                                       Name
                                    </label>
                                    <input type="text"   onChange={this.inputChanged} value={this.state.credentials.name}  className="form-control"  name="name"/>
                                </div>
                               
                      <div className="form-group">
                                    <label htmlFor="password" name="password">
                                       password
                                    </label>
                                    <input type="password" onChange={this.inputChanged} value={this.state.credentials.password}  className="form-control"  name="password"/>
                                </div>
                <button className="btn btn-class" onClick={this.login}>Login</button>
                           
                        </div>
                    </div>
                </div>

                </Register>

            </div>
        )
    }
}


export default Login;