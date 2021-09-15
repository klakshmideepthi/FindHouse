import React, { useEffect, useState,memo } from 'react'
import axios from 'axios'
import {Button} from "react-bootstrap"
import RoomImage from "./RoomImage"
import Styled from "styled-components"
import {renderCards} from "./Home"
import StarRatingComponent from 'react-star-rating-component';
const Contact=Styled.div`
.contact-us-section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #efefef;
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
  .contact-us-section > p {
    text-align: center;
    margin-bottom: 2rem;
  }
  .contact-us-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    width: 80%;
  }
  .input-fields {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .input-fields > input {
    margin-bottom: 2rem;
    outline: 0;
    padding: 8px 20px;
    width: 20rem;
  }
  textarea {
    padding: 8px;
    outline: none;
  }
  .contact-us-section > button {
    background-color: #59ab6e;
    color: white;
    outline: none;
    border: none;
    padding: 7px 18px;
    margin: 1rem;
  }



`
const DetailRoomPage=(props)=>{

   // const dispatch = useDispatch();
   const[name,setName]=useState("");
   const[email,setEmail]=useState("");
   const [subject,setSubject]=useState("");
   const [message,setMessage]=useState("");
  const [similar,setSimilar]=useState([]);
    const [Room, setRoom] = useState([])
const [Id2,setId2]=useState(props.match.params["id"]);
if(props.match.params["id"]!=Id2)
{
  setId2(props.match.params["id"]);
}
    useEffect(async() => {
       // console.log()
        const id1=props.match.params["id"]
       
       await axios.get(`http://localhost:5000/api/rooms/rooms_by_id?id=${id1}&type=single`)
            .then(response => {
                // console.log(response.data[0])
                setRoom(response.data[0])
             
                var data={
                  skip:0,
                  limit:4,
                  searchTerm:response.data[0].housetype
                }
                console.log(data)
                axios.post("http://localhost:5000/api/rooms/getrooms",data).then(
                  response=>{setSimilar(response.data.rooms)});
    
              
            })

           
           
    }, [Id2])

    const addToWatch=(roomID)=>{
        console.log(roomID);
        const data={"_id":localStorage.getItem("id")};
        axios.post(`http://localhost:5000/addtowatch?roomId=${roomID}`,data)
        .then(response => alert("House has added . You can check in favorite list page"));
    }

    const handleSubmit=()=>{
      const data={
        email:localStorage.getItem("email"),
        name:name,
        useremail:email,
        subject:subject,
        message:message
      }
      axios.post("http://localhost:5000/contact",data).then(
        response=>{
          alert("Email sent succesfully");
        })
      
    }
    
    return(
    <div>
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

<div style={{ display: 'flex', justifyContent: 'center',paddingBottom:20 }}>
    <h3>{Room.title}</h3>
   


{/* <br/> */}

    </div>
    <span  style={{fontSize:30,float:"right",marginTop:-59}}>
	  <StarRatingComponent
	 
name="app7" 
  starCount={5}
  value={Room.rating}
editing={false}

	/><span style={{fontSize:15}}>Users rated-{Room.noofusers}</span></span>
<br/>
        <RoomImage detail={Room} addToWatch={addToWatch} />

    
</div>
<Contact>
<section className="contact-us-section">
        <h2>Contact us</h2>
        <p>You can contact the owner by sending mail  from below block. After that if owner agrees<br/> you can schedule a
          video call through our website from above video call button to view the house </p>
        <div className="contact-us-container">
          <div className="input-fields">
            <input type="text" placeholder="Your Name" value={name} onChange={(e)=>{setName(e.target.value)}} />
            <input type="email" placeholder="Enter Your Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <input type="text" placeholder="Subject" value={subject} onChange={(e)=>{setSubject(e.target.value)}} />
          </div>
          <textarea  cols={40} rows={10} placeholder="Your Message" value={message} onChange={(e)=>{setMessage(e.target.value)}}  />
        </div>
        <Button variant="success" onClick={handleSubmit}>Let's Talk</Button>
      </section>
      </Contact>
      <div style={{ display: 'flex', justifyContent: 'center' ,marginTop:40}}>
    <h3>Similar Houses</h3>
</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",marginLeft:30,marginBottom:30}}>
      {renderCards(similar,Room._id)}
      </div>
     
    </div>
    )
}

export default memo(DetailRoomPage);