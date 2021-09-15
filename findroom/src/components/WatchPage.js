import {useEffect,useState} from "react";
import axios from "axios";
import WatchBlock from "./WatchBlock"
const WatchPage=()=>{
    const [watchDetails,setWatchDetails]=useState([]);
    useEffect(()=>{
        let watchIds=[];
       
    axios
    .get('http://localhost:5000/' + localStorage.getItem('id'))
    .then(
      (res) => {
          console.log(res.data.watch)
       res.data.watch.map(value=>{
           watchIds.push(value.id)
          
        });
        getData(watchIds)
    }
    )
}

    ,[])

    const getData=(watchIds)=>{
        axios.get(`http://localhost:5000/api/rooms/rooms_by_id?id=${watchIds}&type=array`)
        .then((response) => 
        setWatchDetails(response.data)
           
            );


      
      
    
    }

    const removeWatch=(roomId)=>{
        console.log(roomId);
        const data={"_id":localStorage.getItem("id")};
        const Ids=[];
        axios.post(`http://localhost:5000/removetowatch?roomId=${roomId}`,data)
        .then(response =>  {
            response.data.map(item=>Ids.push(item.id));
            console.log(Ids);
            if(Ids.length==0)
            {
                setWatchDetails([]);
            }
            else
            {
            getData(Ids)
            }
            
        });
            
      

    }
    return(
        
            <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My favorite List</h1>
            <div>

                <WatchBlock
                removeFromWatch={removeWatch}
                    rooms={watchDetails}
                   
                />


               </div>



           
        </div>
    )
}

export default WatchPage;