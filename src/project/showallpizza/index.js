import axios from 'axios'
import { useEffect, useState } from 'react'
import Home from '../Home'
import './index.css'
import {URL} from '../../config'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'


const Showallpizza = () => {
  const url = `${URL}item/showAll`
  const [products, setProducts] = useState([])
const navigate=useNavigate()

const location = useLocation();

  useEffect(() => {
    getProducts()
  }, [],[location])

  const getProducts = () => {
    axios.get(url).then((response) => {
      const result = response.data
      console.log(result)
      if (result['status'] == 'success') {
        setProducts(result['data'])
      }
    })
  }
  const edit = ()=>{
    navigate('/editpizza')
  }
 
  

  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 3
        }}
    />
);
function deletesize(itemId){
  const url =`${URL}item/delete/${itemId}`
  axios.delete(url).then((response)=>{
    getProducts()

  })
}
console.log(products)
  return (
      <>
            <Home />
      
        <div className="outerdiv-emp-form">
          
          {products.map((product) => {
            return (
              <p>
                
                <p><b>ID :</b> {product.itemid}</p>
                
                <p><strong>Pizza Type :</strong> {product['type']}</p>
                 <p><strong>Pizza Name :</strong> {product['itemName']}</p>
                <p><strong>Description :</strong> {product['description']}</p>
             
                <div className='update'>
              
                <button type="button" onClick={()=>(navigate('/editpizza',{state:{itemId:product.itemid}}))} class="btn btn-sm btn-success">Update</button>           
                <button onClick={()=>deletesize(product['itemid'])} class="btn btn-danger mx-3">delete</button>
                </div>

                <ColoredLine color="black" />
                </p>
               

            )
          })}
      </div>
     
   
    </>
  )
}

export default Showallpizza
