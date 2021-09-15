import React from 'react'
import {Table,Button} from "react-bootstrap";
import {Link} from "react-router-dom"
function WatchBlock(props) {



    const renderCartImage = (images) => {
        console.log(images)
        if(images!==undefined && images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }



    const renderItems = () => (
        props.rooms && props.rooms.map((room,index) => (
            
            <tr key={index}>
               
                <td>
                <Link to={`/room/${room._id}`}>
                    <img style={{ width: '350px',height:'200px' }} alt="room" 
                    src={renderCartImage(room.images)} />
                     </Link>
                </td> 
               
                <td>{room.sqft} Sqft</td>
                <td>$ {room.price} </td>
                <td><Button variant="success" onClick={()=>props.removeFromWatch(room._id)}>Remove </Button> </td>
            </tr>

        ))
    )


    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>House Image</th>
                        <th>House SQft</th>
                        <th>House Price</th>
                        <th>Remove from FavoriteList</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </Table>
        </div>
    )
}

export default WatchBlock
