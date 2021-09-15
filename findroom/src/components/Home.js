import React ,{useEffect,useState} from "react";
import axios from "axios";
import styled from "styled-components";
import {ListState,ListCity,ListPrice,ListSqft} from "./Data"
import {Carousel,Card,Accordion,Button} from "react-bootstrap"
import CheckBox from "./CheckBox"
import RadioBox from "./RadioBox"
import Searchfeature from "./SearchFeature";
import { Link } from 'react-router-dom'

export const renderCards = (Room,roomid)=>
 
{
  console.log(roomid)
  Room=Room.filter(room=>room._id!==roomid);
  console.log(Room)
  if((roomid!=null || roomid!=undefined )&&Room.length==4 )
  {
    console.log(Room);
    Room.splice(3,1);
    console.log(Room)
  }
 const abc= Room.map((room, index) => {
return (<Card style={{ width: '20rem' ,marginTop:50,textDecoration:"none",color:"black"}}  key={index}  >

<Carousel  nextIcon="" nextLabel="" prevIcon="" prevLabel="" fade={true} indicators={false}>
             {room.images.map((image, index) => (
               
                    <Carousel.Item  key={index}>
                      <Link to={`/room/${room._id}`} style={{textDecoration:"none"}}>
                    <img   style={{ width: '100%', maxHeight: '200px' }}
                        src={`http://localhost:5000/${image}`} alt="productImage" />
                        </Link>
                      </Carousel.Item>
             
            ))}
        </Carousel>
        <Link to={`/room/${room._id}`} style={{textDecoration:"none"}}>
<Card.Body style={{color:"black"}}>
             <Card.Title>{room.title}</Card.Title>
<Card.Text>
City&nbsp;&nbsp;:&nbsp;&nbsp;{room.city}&nbsp;&nbsp;Bedrooms&nbsp;&nbsp;:&nbsp;&nbsp;{room.bedrooms}BHK
<br/>
Price&nbsp;&nbsp;:&nbsp;&nbsp;{room.price}k &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sqft&nbsp;&nbsp;:&nbsp;&nbsp;{room.sqft}sqft

</Card.Text>

</Card.Body>
</Link>
</Card>

   )   })
  
  return abc;}

function Home(){
const [Rooms,setRooms]=useState([]);
const [skip, setSkip] = useState(0)
const [PostSize, setPostSize] = useState();
const [limit, setLimit] = useState(6);
const [SearchTerms, setSearchTerms] = useState("")
const [Filters, setFilters] = useState({
  state: [],
  city:[],
  price:[],
  sqft:[]
})
    useEffect(()=>{
      let data={
        skip:skip,
        limit:limit
      }
      getRooms(data);
    },[]);

    const getRooms=(data1)=>{
      axios.post("http://localhost:5000/api/rooms/getrooms",data1).then(
        response=>{
            if(response.data.success){
              if(data1.loadMore)
              {
                console.log("hojn")
                console.log(response.data.rooms)
                setPostSize(response.data.rooms.length)
                const abc=[...Rooms,...response.data.rooms];
                setRooms(abc);
                console.log(Rooms)
              }
              else
            {
              setRooms(response.data.rooms);
              setPostSize(response.data.rooms.length);
            }
                
            }
        }
    )
    }

    const loadMore=()=>{
let skip1=skip+limit;
let data={
  skip:skip1,
  limit:limit,
  loadMore:true,
  filters:Filters,
  searchTerm: SearchTerms
}
getRooms(data);
setSkip(skip1)
    }

    const showFilteredResults = (filters) => {

      const variables = {
          skip: 0,
          limit: limit,
          filters: filters

      }
      getRooms(variables)
      setSkip(0)

  }

  const handlePrice=(value,type)=>{
    var data;
    if(type==0)
    {
      data=ListPrice;
    }
    else
    {
      data=ListSqft;
    }
   
    let array = [];

    for (let key1 in data) {

        if (data[key1].key === parseInt(value, 10)) {
            array = data[key1].array;
        }
    }
    console.log('array', array)
    return array
  }

  const handleFilters=(filters,category)=>{
    console.log(filters)
    const newFilters = { ...Filters }

    newFilters[category] = filters
console.log(filters);
    if (category === "price") {
        let priceValues = handlePrice(filters,0)
        newFilters[category] = priceValues

    }

    if (category === "sqft") {
      let priceValues = handlePrice(filters,1)
      newFilters[category] = priceValues

  }

    // console.log(newFilters)

    showFilteredResults(newFilters)
    setFilters(newFilters)
  }

  const updateSearchTerms = (newSearchTerm) => {

    const variables = {
        skip: 0,
        limit: limit,
        filters: Filters,
        searchTerm: newSearchTerm
    }

    setSkip(0)
    console.log(newSearchTerm)
    setSearchTerms(newSearchTerm)

    getRooms(variables)
}

    




    return(
        <div style={{ width: '75%', margin: '3rem auto' }}>
        <div style={{ textAlign: 'center' }}>
            <h2>  Let's Find best House   </h2>
            <div style={{float:"right"}}>
            <Searchfeature updatesearch={updateSearchTerms}/>
            </div>
        </div>
        <br/>
        <br/>
        <br/>

        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",marginRight:10}}>
      <CheckBox  list={ListState} name1="State"  handleFilters={filters => handleFilters(filters, "state")}/>
      <CheckBox  list={ListCity} name1="City" handleFilters={filters => handleFilters(filters, "city")}/>
      <RadioBox  list={ListPrice} name1="Price"  handleFilters={filters => handleFilters(filters, "price")} />
      <RadioBox  list={ListSqft} name1="Sqft"  handleFilters={filters => handleFilters(filters, "sqft")} />
    
      </div>
        {Rooms.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)"}}>
                   
            
                    {Rooms.length>0 && renderCards(Rooms)}

                        


                </div>
            }
{PostSize > 0 &&
<div style={{ display: 'flex', justifyContent: 'center',marginTop:20 }}>
<Button variant="success"  onClick={loadMore}>Load More</Button>
                </div>}
</div>







    )
}

export {Home};
