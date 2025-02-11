import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { URL } from '../../config'
import { useLocation } from 'react-router'
import Home from '../Home'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Placeholder } from 'react-bootstrap'


const Editpizza = () => {
    // const location = useLocation()
    // const {itemId} = state
    
    const [pizza, setPizza] = useState(null)
    const [pizzasize, setPizzasize] = useState([])

    const [type,settype]=useState('')
    const [itemName,setitemName]=useState('')
    const [description,setDescription]=useState('')
    const [itemId, setItemId] = useState(null);
    const navigate=useNavigate()
    const location = useLocation();
  console.log(location);

    useEffect(() => {
        settype(type)
        setItemId(location.state.itemId)
        console.log("locationi "+location.state.itemId)
        console.log(itemId)
        setitemName(itemName)
        setDescription(description)
        // getProducts()
        // getSize()
    },[itemId])

     
    const save = () => {
        if (type.length == 0) {
            toast.warning('please enter pizza type')
          } else if (itemName.length == 0) {
            toast.warning('please enter pizza name')
          } else if (description.length == 0) {
            toast.warning('please enter description')
          } else {
            const body = {
              type,
             itemName,
              description,
            }

           
              
             
          const url =`${URL}item/updateItem/${itemId}`
            axios.put(url,body).then((response) => {
                const result =response.data
                if(result['status']=='success'){
                    toast.success('successfully updated ')
                    navigate('/showallpizza')
                }else{
                    toast.error(result['error'])
                }
            })
        }
    }
      const getProducts = () => {
        console.log(itemId)
        const url=`${URL}item/getbyid/${itemId}`
        axios.get(url).then((response) => {
          const result = response.data
          if (result['status'] == 'success') {
            setPizza(result['data'])
           
          }
        })
      }

      const getSize=()=>{
        const url = `${URL}itemSize/itemsizeId/${itemId}`
             axios.get(url).then((response)=>{
                const result = response.data
                console.log(result)
                if(result.status == "success"){
                    setPizzasize(result.data)
                }else{
                    toast.error("you did't add pizza sizes and price")
                }
            })
      }
      // function deletesize(sizeId){
      //   const url =`${URL}itemSize/delete/${sizeId}`
      //   axios.delete(url).then((response)=>{
      //     window.location.reload(false);
    
      //   })
      // }
    
      useEffect(() => {
        if (itemId) {
          getProducts();
          // getSize();
        } else {
          console.log(itemId);
        }
      }, [itemId]);
      
      return (
        
        <>
        <div>
          <Home />
        </div ><div className='edit'>
        <h2 className="title"><b>Update Pizza</b></h2>
            {/* {products.map((product) => { */}
                    {/* return (         */}
            {pizza?(
            <div className="form" >
              <div className="mb-3">
                <label htmlFor="" className="label-control">
                  Pizza Type     :
                </label>
                <select className="form-select form-select-sm" onChange={(e) => settype(e.target.value)} aria-label="Default select example">
                          <option value={settype}>choose Type</option>
                              <option value="veg">Veg</option>
                              <option value="non-veg">NonVeg</option>
                          </select>
              </div>
      
              <div className="mb-3">
                <label htmlFor="" className="label-control">
                  Pizza Name :
                </label>
                <input
                  value={itemName}
                  onChange={(e) => {
                    setitemName(e.target.value)
                  } }
                  type="text"
                  className="form-control" placeholder= {pizza['itemName']} />
              </div>
      
              <div className="mb-3">
                <label htmlFor="" className="label-control">
                  Description :
                </label>
                <input
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value)
                  } }
      
                  className="form-control"  placeholder={pizza['description']} />
              </div>
      
              <div className="mb-3">
                <button onClick={save} className="btn btn-success" >
                  Save Pizza
                </button>
                <button  onClick={()=>(navigate ('/Addpizzasize',{state:{pizza}}))} className="btn btn-primary mx-3 ">Add pizzasize</button>
                <Link to="/home" className="btn btn-danger float-end">
                  Cancel
                </Link>
               
               <div>
              
              <br />
      {/* <table className="table table-dark">
        <thead>
          <tr>
            
            <th>sizeId</th>
            <th>Size</th>
            
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {pizzasize.map((size) => {
            return (
              <tr>
                <td>{size['sizeId']}</td>
                <td>{size['size']}</td>
                <td>{size['price']}</td>
                <td><button  onClick={()=>(navigate('/editpizzasize',{state:{sizeId:size['sizeId']}}))} className="btn btn-primary mx-3 ">Update pizzasize</button></td>
                <td><button onClick={()=>deletesize(size['sizeId'])} className="btn btn-danger">delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table> */}
    
               </div>
              </div>
            </div>
            ):(<h2>loading</h2>)}
            {/* ) */}
          {/* })}              */}

            </div>
            </>
          
        )
      }

export default Editpizza;
