
import Home from '../Home'
import axios from 'axios';
 
import React,{Component, useEffect, useState} from 'react';
import { useLocation,state, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URL } from '../../config';
 

const UploadToppingImg=(props)=> {
    const location = useLocation()
    const navigate =useNavigate()
    const [topping,setTopping]=useState([]);
    

    useEffect(() => {
      if (location.state && location.state.top) {
        setTopping(location.state.top)
        console.log("in useState "+topping.toppingId)
      }
    }, []);
      // Initially, no file is selected
    const[selectedFile,setSelectedFile] = useState()
    // On file select (from the pop up)
    const onFileChange = (event) => {
    
      // Update the state
      const img = ( event.target.files[0]) ;
      setSelectedFile(img)
    
    };
    
    // On file upload (click the upload button)
    const onFileUpload = () => {
        
      // Create an object of formData
      const formData = new FormData();
    
      // Update the formData object
      formData.append(
        "imageFile",
        selectedFile,
        //selectedFile.name,
        
      );
    
      // Details of the uploaded file
      console.log(selectedFile);
    
      // Request made to the backend api
      // Send formData object
   const toppingId=topping.toppingId;
      var url=`${URL}toppingImages/addtoppingthumbnail/${toppingId}`
      axios.post(url, formData).then(response => {
        toast.success('Image added');
        navigate('/addtoppings');
      })
      .catch(error => {
        console.error(error);
        toast.error('Failed to add image');
      });
    };
    

    
      return (
          <><div>
              <Home />
          </div><div className="outerdiv-emp-form">

                  <div>
                      <input type="file" onChange={onFileChange} />
                      <button onClick={onFileUpload}>
                          Upload
                      </button>
                  </div>
                  {/* {fileData()} */}
              </div></>
      );
    }
  

 
  export default UploadToppingImg;