import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import {ListGroup,Card,Button} from "react-bootstrap"
import {Redirect} from "react-router"
function RoomImage(props) {
    const [Images, setImages] = useState([])
    const [val,setcall]=useState(false);
    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            let images = [];

            props.detail.images && props.detail.images.map(item => {
                images.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail])

    const AddToWatchlist=()=>{
        props.addToWatch(props.detail._id);
    }
    const videocall=()=>{
        setcall(true);
    }
if(val)
{
    console.log(props.detail._id)
    return <Redirect to={{pathname:"/video",state:{roomid:props.detail._id}}}/>
}


    return (
        <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)"}}>
                <div style={{ paddingBottom:10,}}>
            <ImageGallery items={Images} />
            </div>
            <div style={{marginLeft:40}}>
              <h3 style={{textAlign:"center"}}>House Details</h3>
             <br/>
             
  <ListGroup horizontal>
<ListGroup.Item ><b>HouseType</b>&nbsp;&nbsp; :&nbsp;&nbsp;{props.detail.housetype}</ListGroup.Item>
    <ListGroup.Item><b>HouseNumber</b>&nbsp;&nbsp; :&nbsp;&nbsp;{props.detail.housenumber}</ListGroup.Item>
    
  </ListGroup>



  <ListGroup   horizontal>
    
    <ListGroup.Item><b>City</b>&nbsp;&nbsp; :&nbsp;&nbsp;{props.detail.city}</ListGroup.Item>
    <ListGroup.Item><b>State</b>&nbsp;&nbsp; :&nbsp;&nbsp;{props.detail.state}</ListGroup.Item>
    <ListGroup.Item><b>Price</b>&nbsp;&nbsp; :&nbsp;&nbsp;{props.detail.price}</ListGroup.Item>
  </ListGroup>



  <ListGroup   horizontal>
     <ListGroup.Item><b>BedRooms</b>&nbsp;&nbsp; :&nbsp;&nbsp;{props.detail.bedrooms}</ListGroup.Item>
    
    <ListGroup.Item><b>SQft</b>&nbsp;&nbsp; :&nbsp;&nbsp;{props.detail.sqft}</ListGroup.Item>

  
    <ListGroup.Item><b>ZipCode</b>&nbsp;&nbsp; :&nbsp;&nbsp;{props.detail.zipcode}</ListGroup.Item>
  </ListGroup>
  <ListGroup   horizontal>
 <ListGroup.Item><b>Address</b>&nbsp;&nbsp; :&nbsp;&nbsp;{props.detail.address}</ListGroup.Item>
  </ListGroup>
      <Card>
     <Card.Footer >
    
         <b>Description of house</b>
     <br/>
     {props.detail.description}
     
     </Card.Footer>
     
{/* <Card.Body>{props.detail.description}</Card.Body> */}
</Card>
<br/>
<br/>
<Button variant="success" onClick={AddToWatchlist}>Add to FavoriteList</Button>
<Button variant="success" style={{float:"right"}} onClick={videocall}>Video Call</Button>

            </div>
            </div>
        </div>
    )
}

export default RoomImage
