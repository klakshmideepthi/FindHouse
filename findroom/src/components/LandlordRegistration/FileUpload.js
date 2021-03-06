import Dropzone from 'react-dropzone';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import React,{useState} from "react";
function FileUpload(props){

    const [Images, setImages] = useState([])

    const onDrop = (files) => {
        console.log("dff");
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        axios.post('http://localhost:5000/api/rooms/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {

                    setImages([...Images, response.data.image])
                    props.updateImages([...Images, response.data.image])

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }


    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.updateImages(newImages)
    }


    return(
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* onDrop function it triggers when the plus button is clicked */}
             <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        
                        <input {...getInputProps()} />
                        <AddIcon style={{ fontSize: '3rem' }} />

                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'auto' }}>

{Images.map((image, index) => (
    <div key={index} onClick={() => onDelete(image)}>
        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:5000/${image}`} alt={`productImg-${index}`} />
    </div>
))}
</div>
            </div>
    )
}

export default FileUpload;