import React,{Component} from "react";
import svg1 from "./images/svg1.svg";
import Styled from "styled-components";
import axios from 'axios';
import { Redirect } from 'react-router';
const Register=Styled.div`
.container{
    font-family:'Poppins',sans-serif;
    background-color:#00ac96;
    
}
.content{
   margin:8%;
   padding:4rem 1rem 3rem 1rem;
  
    background-color:#fff;
    margin-bottom:100px;
    border-radius:4;
    box-shadow:0 0 5px 5px rgba(0,0,0,0.05);

}
.form-group{
    padding-bottom:20px;
    font-size:1.2rem;
}
.signin-text{
    font-style:normal;
    font-weight:600 !important;
}
.form-control{
    display:block;
    width:100%;
    font-size:1rem;
    font-weight:400;
    line-height:1.5;
    border-color:#00ac96 !important;
    border-style:solid !important;
    border-width:0 0 1px 0 !important;
    
    color:#495057;
    height:auto;
    border-radius:4;
    background-color:#fff;
    background-clip:padding-box;
}

.form-control:focus{
    color:#49507;
    background-color:#fff;
    border-color:#fff;
    outline:0;
    box-shadow:none;
}

.btn-class{
    border-color:#00ac96;
    color:#00ac96;
}

.btn-class:hover{
    background-color:#00ac96;
    color:#fff;
}


`
class Signup extends Component{

    state={
        credentials:{email:'',name:'',person:'',password:''},
        message:'',
        registered:false,
      };

      register=event=>{
        event.preventDefault();
       
         
        console.log(this.state.credentials);
        
        var data=this.state.credentials;
        axios.post('http://localhost:5000/signup',data).then(
            res=>{
                console.log(res)
                this.setState({
                  registered:true
                })

            }).catch(
              
                err=>{
                  //console.log(err.response);
                
      
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
        if(this.state.registered)
        {
            return <Redirect to='/login' />
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
                                SignUp
                            </h2>
                          
                                <div className="form-group">
                                    <label htmlFor="email" name="email">
                                        Email
                                    </label>
                                    <input type="email"   onChange={this.inputChanged} value={this.state.credentials.email} className="form-control"  name="email"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" name="name">
                                       Name
                                    </label>
                                    <input type="text"   onChange={this.inputChanged} value={this.state.credentials.name}  className="form-control"  name="name"/>
                                </div>
                                <div className="form-group">
                                 <label htmlFor="name">Person:</label>
                            <select type="text" onChange={this.inputChanged} value={this.state.credentials.person}   className="form-control"  placeholder={"Choose your title1"} name="person" required >
                      <option value="-1">Choose your title</option>
                      <option value="0">Customer</option>
                      <option value="1">Owner</option>
                      </select>
                      </div>
                      <div className="form-group">
                                    <label htmlFor="password" name="password">
                                       password
                                    </label>
                                    <input type="password" onChange={this.inputChanged} value={this.state.credentials.password}  className="form-control"  name="password"/>
                                </div>
                <button className="btn btn-class" onClick={this.register}>Register</button>
                           
                        </div>
                    </div>
                </div>

                </Register>

            </div>
        )
    }
}


export default Signup;
export {Register};