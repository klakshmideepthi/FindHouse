import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import VideocamOffOutlinedIcon from '@material-ui/icons/VideocamOffOutlined';
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import React, { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import {Card} from "react-bootstrap"
import Peer from "simple-peer"
import io from "socket.io-client";
import StarRatingComponent from 'react-star-rating-component';
 import MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined';
import MicOffOutlinedIcon from '@material-ui/icons/MicOffOutlined';
import styled from "styled-components";
import CallEndOutlinedIcon from '@material-ui/icons/CallEndOutlined';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import axios from "axios"
const VideoStyle=styled.div`
.container {
	display: grid;
	grid-template-columns: 11fr 3fr;
}

.myId {
	margin-right: 5rem;
	border-radius: 5px;
	background: #c9d6ff; /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #e2e2e2, #c9d6ff); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(
		to right,
		#e2e2e2,
		#c9d6ff
	); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

	padding: 2rem;
	display: grid;
	justify-content: center;
	align-content: center;
}

.call-button {
	text-align: center;
	margin-top: 2rem;
}

.video-container {
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-content: center;
	align-content: center;

	margin-left: 10rem;
}

.caller {
	text-align: center;
	color: #fff;
}

.videochat {
	background: #4776e6; /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #8e54e9, #4776e6); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(
		to right,
		#8e54e9,
		#4776e6
	); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	//background-color: #efefef;
	background: -webkit-linear-gradient(to right, #ffd89b, #19547b);
//   background: linear-gradient(to right, #ffd89b, #19547b);
// background: -webkit-linear-gradient(to right, #304352, #d7d2cc);
//   background: linear-gradient(to right, #304352, #d7d2cc);
}
`
const Container=styled.div`#video-grid{
	
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
 }
 video{
    height: 300px;
    width: 400px;
    object-fit: cover;
    padding: 8px;
 }
 .main {
    height: 100vh;
    display: flex;
}

.main__left {
   
    display: flex;
    flex-direction: column;
}

.main__right {
    flex: 0.2
}

.main__videos {
    flex-grow: 1;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
  
}

.main__controls {
    background-color: #1C1E20;
}

.main__right {
    background-color: #242324;
    border-left: 1px solid #3D3D42;
}

.main__controls {
    color: #D2D2D2;
    display: flex;
    justify-content: space-between;
    padding: 5px;
}

.main__controls__block {
    display: flex;
}

.main__controls__button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px 10px;
    min-width: 80px;
    cursor: pointer;
}

.main__controls__button:hover {
    background-color: #343434;
    border-radius: 5px;
}

.main__controls__button i {
    font-size: 24px;
}

.main__right {
    display: flex;
    flex-direction: column;
}

.main__header {
    padding-top: 5px;
    color: #F5F5F5;
    text-align: center;
}

.main__chat_window {
    flex-grow: 1;
    overflow-y: auto;
}

.messages{
    color: white;
    list-style: none;
}

.main__message_container {
    padding: 22px 12px;
    display: flex;
}

.main__message_container input {
    flex-grow: 1;
    background-color: transparent;
    border: none;
    color: #F5F5F5;
}

.leave_meeting {
    color: #EB534B;
}

.unmute, .stop {
    color: #CC3B33;
}
`;

function VideoChat(props) {
	const [ me, setMe ] = useState("")
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [	owner, setOwner] = useState(false)
	const [ star, setStar] = useState(false)
	const [ name, setName ] = useState("");
	const [chatmessage,setChatMessage]=useState(false);
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef()
	const [onvideo,setOnVideo]=useState(true);
	const [onaudio,setAudio]=useState(true);
	const  socketRef =useRef();
	const [ message, setMessage ] = useState("")
	const [ chat, setChat ] = useState([])
	const [rating,setRating]=useState(0);
	const [roomId,setroomId]=useState("");
	useEffect(() => {
		console.log(typeof(props.location.state))
		if(props.location.state!==undefined&& props.location.state.roomid!=null && props.location.state.roomid!=undefined)
		{
			setroomId(props.location.state.roomid);
		}
		  socketRef.current = io.connect('http://localhost:5000')
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
				myVideo.current.srcObject = stream
				window.localStream = stream;
				console.log(myVideo.current.srcObject)
				
		})
        console.log("hrljjjj")
	 socketRef.current.on("me", (id) => {
         console.log(id)
            setMe(id)
            console.log(me)
		})

		socketRef.current.on("message", (message ) => {
			setChat(oldMsgs => [...oldMsgs, message]);
			//setChat([ ...chat, { name, message } ])
		})
		 socketRef.current.on("callUser", (data) => {
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})

		return ()=>{
			// stream.getTracks().forEach(function(track) {
			// 	if (track.readyState == 'live') {
			// 		track.stop();
			// 	}
			// });
			window.localStream.getTracks().forEach((track) => {
				track.stop();
			  })
		} 
	},[])

	const callUser = (id) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		//This event is used when peer wants to send the signaling data 
		//to another peer
		//So it is the responsibilty of the application developer to send this data to 
		//other peer genearlly we use  socketRef.currents to send the data.
		//Now here  socketRef.current emits the callUser event
		peer.on("signal", (data) => {
			 socketRef.current.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})
		 socketRef.current.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
			
		})

		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		
		})

		connectionRef.current = peer
	}

	const answerCall =() =>  {
		setOwner(true);
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			 socketRef.current.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
			
			// console.log(userVideo)
			// console.log(userVideo.current.srcObject.getVideoTracks()[0].enabled)
			
		})
		//Now a direct connection is established between the peers
		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		if(!owner)
		{
			setStar(true);
		}
		else{
		setCallEnded(true)
		setCallAccepted(false);
		setReceivingCall(false);
		connectionRef.current.destroy()
		}
	}

	const videoStop=()=>{
		console.log("hjdd")

	let enabled=myVideo.current.srcObject.getVideoTracks()[0].enabled
	if(enabled){
		myVideo.current.srcObject.getVideoTracks()[0].enabled=false;
		// myVideo.current.srcObject.getVideoTracks()[0].stop()
	
		setOnVideo(false);
		
	
	}
	else
	{
		myVideo.current.srcObject.getVideoTracks()[0].enabled=true;
	
		setOnVideo(true);
	}

	}

	

	const audioStop=()=>{
	let enabled=	myVideo.current.srcObject.getAudioTracks()[0].enabled;
	
	if(enabled){
		myVideo.current.srcObject.getAudioTracks()[0].enabled=false;
	
		setAudio(false);
		
	
	}
	else
	{
		myVideo.current.srcObject.getAudioTracks()[0].enabled=true;
		setAudio(true);
	}
	}



	const onTextChange = (e) => {
		setMessage(e.target.value);
	}

	const onMessageSubmit = (e) => {
		e.preventDefault()
		console.log(message);
		setChatMessage(true);
		socketRef.current.emit("message", { name:"vishnu", message:message })
	setMessage("");
		
	}

	const endCall=()=>{
		console.log(rating)
		setStar(false);
		setCallEnded(true)
		setCallAccepted(false);
		setReceivingCall(false);
		var data={
			roomId:roomId,
			rating:rating
		}
		axios.post("http://localhost:5000/api/rooms/roomid",data).then(
			response=>response.data
		)
	}

	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					{name}: <span>{message}</span>
				</h3>
			</div>
		))
	}
	const onStarClick=(nextValue, prevValue, name)=> {
		
		setRating(nextValue);
	  }


	return (
		<VideoStyle>
			
<div className="videochat" >
	{!callAccepted &&<br/>}
	{!callAccepted &&<br/>}
	{/* {!callAccepted &&<br/>} */}
					<div>
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<h1 style={{color:"black"}}>{localStorage.getItem("name")} is calling...</h1>
						<Button variant="contained" color="primary" onClick={answerCall}>
							Answer
						</Button>
					</div>
				) : null}
			</div>

			<Container>
				
		<div className={callAccepted&&!callEnded?"main" :"container"}>
			<div className={callAccepted&&!callEnded?"main__left" :   "video-container"}>
				
				<div className={callAccepted&&!callEnded?"main__videos" :   "video"}  style={{height:500}}>
				{/* <Styl> */}
				{/* {!callAccepted&&<br/>} */}
				<div id={callAccepted&&!callEnded?"video-grid":""}>
					
					{stream &&  <video  ref={myVideo} autoPlay style={callAccepted?{ width: "200px",height:200,transform:"scaleX(-1)"}:{width: "500px",height:400,transform:"scaleX(-1)"}} />}
				
		
					{
					callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "700px",marginRight:120,height:400,transform:"scaleX(-1)"}} />:
					null}
						{star&&
						<Card style={{marginTop:-150}}>
  <Card.Body >Please Submit the review of the house.
	  It will be helpful for other users
	  <br/>
	  <div   style={{fontSize:30,textAlign:"center"}}>
	  <StarRatingComponent
	 
name="rate1" 
  starCount={5}
  value={rating}
  onStarClick={onStarClick}
	/></div>
	<div   style={{textAlign:"center"}}>
<Button onClick={endCall} style={{float:"center",backgroundColor:"black",color:"white"}}>Submit</Button></div>
</Card.Body>

</Card>

	}
					{!callAccepted&&
					<>
				<br/>
					<span onClick={videoStop} style={{paddingRight:100,marginLeft:140}}>
					<IconButton>
						{onvideo&& <VideocamOutlinedIcon style={{ fontSize: 75 }}  />}
						{!onvideo &&<VideocamOffOutlinedIcon style={{ fontSize: 75}} />}
						</IconButton>
						
               
              </span>

			  <span onClick={audioStop}>
			  <IconButton >
						{onaudio&& <MicNoneOutlinedIcon style={{ fontSize: 70  }} />}
						{!onaudio &&<MicOffOutlinedIcon style={{ fontSize: 70  }}/>}
						</IconButton>
              </span>
			  </>}

					</div>
				</div>
				
				
			
					{callAccepted && !callEnded && <>
						
        
					<div className="main__controls">
								 <div className="main__controls__block" style={{textAlign:"center"}}>
								   
								 <span onClick={videoStop} style={{paddingRight:20,marginLeft:400}}>
								 <IconButton  >
						{onvideo&& <VideocamOutlinedIcon style={{ fontSize: 75,color:"#fff"}}  />}
						{!onvideo &&<VideocamOffOutlinedIcon style={{ fontSize: 75,color:"#fff"}} />}
						</IconButton>
               
              </span>

						
			  <span  onClick={leaveCall} style={{paddingRight:20,}}>
			  <IconButton >
			  <CallEndOutlinedIcon style={{ fontSize: 75 ,color:"#fff"}}/>
			  </IconButton>
			  </span>
			  <span onClick={audioStop}>
			  <IconButton >
						{onaudio&& <MicNoneOutlinedIcon style={{ fontSize: 70 ,color:"#fff" }} />}
						{!onaudio &&<MicOffOutlinedIcon style={{ fontSize: 70 ,color:"#fff" }}/>}
						</IconButton>
               
              </span>
								
								 </div>
								
								
					</div>
					
							
							 </>}


				
			  
			 </div>
			 {callAccepted&& !callEnded  && <div className="main__right" style={{paddingRight:80,overflowY:"visible"}}>
							   <div className="main__header">
								 <h6>Chat</h6>
							   </div>
							   <div className="main__chat_window">
								 <ul className="messages">
								 {chatmessage&& renderChat()}
								 </ul>
							   </div>
							   <div className="main__message_container">
								 <input id="chat_message" 	name="message" onChange={(e) => onTextChange(e)}
						value={message} type="text" placeholder="Type message here..." />
						<span onClick={onMessageSubmit}><SendRoundedIcon style={{marginLeft:20,color:"white"}}/></span>
								 
							   </div>
							  
							 </div>}
		{!callAccepted&&
		<>
			<div className="myId" style={{width:330,paddingRight:40,height:400}}>
				<TextField
					id="filled-basic"
					label="Name"
					variant="filled"
					value={localStorage.getItem("name")}
				
					style={{ marginBottom: "20px" }}
				/>
				<CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
					<Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
						Copy ID
					</Button>
				</CopyToClipboard>

				<TextField
					id="filled-basic"
					label="ID to call"
					variant="filled"
					value={idToCall}
					onChange={(e) => setIdToCall(e.target.value)}
				/>
				<div className="call-button">
					{callAccepted && !callEnded ? (
						<Button variant="contained" color="secondary" onClick={leaveCall}>
							End Call
						</Button>
					) : (
						<IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
							<PhoneIcon fontSize="large" />
						</IconButton>
					)}
					{idToCall}
				</div>
			</div>
		</>}
		</div>
		</Container>
		</div>
		
		</VideoStyle>
	)
}

export default VideoChat
