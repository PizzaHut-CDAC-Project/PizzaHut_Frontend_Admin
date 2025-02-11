
import Home from '../Home'
import axios from 'axios';
 
import React,{Component, useState} from 'react';
import { useLocation,state, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URL } from '../../config';

 

const AddPizzaimage=(props)=> {
    const location = useLocation()
    const pizza = location.state
    const navigate =useNavigate()
    // Initially, no file is selected
    const[selectedFile,setSelectedFile] = useState()
    console.log("in add image:"+pizza.itemid);  
    console.log(location.state); 
    
    
    // On file select (from the pop up)
    const onFileChange = (event) => {
      
      // Update the state
      const img = ( event.target.files[0]) ;
      setSelectedFile(img)
    };
    
    // On file upload (click the upload button)
    const onFileUpload = (event) => {
      if(selectedFile===undefined){

        window.alert("please upload a file first")
      }else{
      // Create an object of pizzaThumbnail
      const pizzaThumbnail = new FormData();
    
      // Update the pizzaThumbnail object
      pizzaThumbnail.append(
        "imageFile",
        selectedFile,
        //selectedFile.name,
        
      );
    
      // Details of the uploaded file
      console.log(selectedFile);
    
      // Request made to the backend api
      // Send pizzaThumbnail object
   
      var url=`${URL}itemImage/add/${pizza.itemid}`
      console.log(url)
      axios.post(url, pizzaThumbnail)
  .then(response => {
    toast.success('Image added');
    navigate('/Addpizzasize', { state: { pizza } });
  })
  .catch(error => {
    console.error(error);
    toast.error('Failed to add image');
  });
    };}

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
  

 
  export default AddPizzaimage;