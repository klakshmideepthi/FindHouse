import React, { Component } from "react";
import Styled from "styled-components";
import FileUpload from './FileUpload';
import axios from "axios";
import { Redirect } from 'react-router';
const Register=Styled.div`
.data{
    float:left;
}
.form-group{
    padding-bottom:20px;
    font-size:1.2rem;
}

.form-control{
    display:block;
    width:100%;
    font-size:1rem;
    font-weight:400;
    
    
    color:#495057;
    height:auto;
    border-radius:4;
    background-color:#fff;
    background-clip:padding-box;
}

.form-control:focus{
    color:#49507;
   
    border-color:black;
   
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


class LandlordRegister extends Component{

    state = {
       
        credentials:{
        writer:localStorage.getItem("id"),
        housetype:'',
        title:'',
        housenumber:'',
        description:'',
        address:'',
        city:'',
        state:'',
        zipcode:'',
        bedrooms:'',
        price:'',
        sqft:'',
        images:[],
        
      
        
        },
        submit:false,
       
    
    
      };

      onSubmit=(e)=>{
          e.preventDefault();

          if (!this.state.credentials.housetype || !this.state.credentials.title || !this.state.credentials.housenumber ||
            !this.state.credentials.description || !this.state.credentials.address||!this.state.credentials.city||!this.state.credentials.state
            ||!this.state.credentials.zipcode   ||!this.state.credentials.bedrooms   ||!this.state.credentials.price
            ||!this.state.credentials.sqft
            ) {
            return alert('fill all the fields first!')
        }

         
          var data=this.state.credentials;

   axios.post('http://localhost:5000/api/rooms/uploadroom', data)
   .then(response => {
       if (response.data.success) {
           alert('Product Successfully Uploaded')
           this.setState({submit:true})
       } else {
           alert('Failed to upload Product')
       }
   })

      }
      updateImages=(newImage)=>{
          this.statechanged("images",newImage);
      }
      inputChanged= event=>{
      
        //console.log(event.target.name);
        this.statechanged(event.target.name,event.target.value)
      }

      statechanged= (names,value)=>{

        const cred=this.state.credentials;
       cred[names]=value;
        console.log(cred);
        this.setState({credentials:cred});
      }

  render(){
      if(this.state.submit)
      {
        return <Redirect to="/" />;
      }
return(

<div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>LandlordRegister Page</h1>
        <br />
        <br />
        <h5 style={{float:"left"}}>Upload your house Images</h5>
                <br />
                
               
               
                <br />
                <FileUpload updateImages={this.updateImages}/>
                <br />
        <br />
                <Register>
                    <div className="form-group">
                <label className="data"htmlFor="housetype">HouseType:</label>
                 <select type="text"  value={this.state.credentials.housetype} name="housetype" onChange={this.inputChanged}   className="form-control"  placeholder={"Choose your HouseType"} required >
                <option value="">Choose your title</option>
                 <option value="Apartment">Apartment</option>
                <option value="IndependentHouse">Independent House</option>
                <option value="Villa">Villa</option>
                <option value="FormHouse">FarmHouse</option>
                </select>
                 </div>

                 <div className="form-group">
                <label className="data"htmlFor="title" name="title">
                    Title of house
                 </label>
                <input type="text"  value={this.state.credentials.title} onChange={this.inputChanged}   className="form-control"  name="title"/>
                </div>

                <div className="form-group">
                <label className="data"htmlFor="housenumber" name="housenumber">
                    HouseNumber
                 </label>
                <input type="text" value={this.state.credentials.housenumber} onChange={this.inputChanged}   className="form-control"  name="housenumber"/>
                </div>

                <div className="form-group">
                <label className="data"htmlFor="description" name="description">
                   Description 
                 </label>
                <textarea type="text"  value={this.state.credentials.description}  onChange={this.inputChanged}  className="form-control" rows="4" cols="30"  name="description"/>
                </div>

                <div className="form-group">
                <label className="data"htmlFor="address" name="address">
                  Address 
                 </label>
                <input type="text" value={this.state.credentials.address}  onChange={this.inputChanged}  className="form-control"  name="address"/>
                </div>

                <div className="form-group">
                <label className="data"htmlFor="city" name="city">
                 City
                 </label>
                <input type="text" value={this.state.credentials.city}  onChange={this.inputChanged}  className="form-control"  name="city"/>
                </div>

                <div className="form-group">
                <label className="data"htmlFor="state" name="state">
                 State
                 </label>
                <input type="text" value={this.state.credentials.state}  onChange={this.inputChanged}  className="form-control"  name="state"/>
                </div>

                <div className="form-group">
                <label className="data"htmlFor="zipcode" name="zipcode">
                ZipCode
                 </label>
                <input type="text"  value={this.state.credentials.zipcode} onChange={this.inputChanged}   className="form-control"  name="zipcode"/>
                </div>

                <div className="form-group">
                <label className="data"htmlFor="bedrooms" name="bedrooms">
                BedRooms
                 </label>
                <input type="number"  value={this.state.credentials.bedrooms} onChange={this.inputChanged}   className="form-control"  name="bedrooms"/>
                </div>

                <div className="form-group">
                <label className="data"htmlFor="price" name="price">
                Price
                 </label>
                <input type="number" value={this.state.credentials.price} onChange={this.inputChanged}   className="form-control"  name="price"/>
                </div>

                <div className="form-group">
                <label className="data"htmlFor="sqft" name="sqft">
               Sqft
                 </label>
                <input type="number" value={this.state.credentials.sqft}   onChange={this.inputChanged} className="form-control"  name="sqft"/>
                </div>

                <button className="btn btn-class" onClick={this.onSubmit}>Register</button>
                </Register>


            </div>
</div>)
}}

export default LandlordRegister;