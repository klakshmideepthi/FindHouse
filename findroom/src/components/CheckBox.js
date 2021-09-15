import React,{useState} from "react";
import {Carousel,Card,Accordion} from "react-bootstrap"


function CheckBox(props){
   
    const [Checked,setChecked]=useState([])
    const handleToggle=(value)=>{
        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked);
        props.handleFilters(newChecked)

    }
  
    return(
        <div >
        <Accordion>
        <Card style={{width:500,marginRight:10,marginBottom:14}}>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            {props.name1}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body style={{}}>
             
            {props.list.map((value)=>
        <span key={value.key} style={{dispaly:"inline-block",marginRight:8}} >
            <input  type="checkbox"   value={value.name} onChange={()=>handleToggle(value.name)} style={{marginRight:6}}
            />
<label htmlFor="vehicle1" > {value.name}</label>

            </span>
            
            )}


            </Card.Body>
           </Accordion.Collapse>
        </Card>
        
         
      </Accordion>
      
    </div>
    )
}

export default CheckBox;
