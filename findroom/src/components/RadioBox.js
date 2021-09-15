import React,{useState} from "react";
import {Carousel,Card,Accordion} from "react-bootstrap"


function CheckBox(props){
   
    const [Value, setValue] = useState('0')
    const handleChange=(value)=>{
        console.log(value)
        setValue(value)
        props.handleFilters(value)

    }
  
    return(
        <div >
        <Accordion>
        <Card style={{width:500,marinRight:10}}>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            {props.name1}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body style={{}}>
             
            {props.list.map((value)=>
        <span key={value.key} style={{dispaly:"inline-block",marginRight:10}} >
            <input  type="radio" onChange={()=>{handleChange(value.key)}}  name={props.name1} value={Value}  style={{marginRight:6}}
            />
<label > {value.name}</label>

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
