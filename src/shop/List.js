import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function List() {
let [total,setTotal]=useState();
  let navigate = useNavigate();
     
  let [shopproduct, setShopproducts] = useState([]);
  useEffect(()=>{
    if(localStorage.getItem("shopproduct") != null){
      setShopproducts(JSON.parse(localStorage.getItem("shopproduct")));
      setTotal(shopproduct);
    }
    else{
      navigate("/");
    }
  }, []);

  useEffect(() => {
    let allquantity = 0;

    shopproduct.forEach(product => {
      allquantity += product.quantity * product.price;
    });
    setTotal(allquantity);

  }, [shopproduct]);


  return (
    <div>
      <h2 className='text-center'>List of Product </h2>

      <div className=' container mb-4'>
            <h1 className='text-center'> E-commerce shopping</h1>

            <table>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>IMAGE</th>
                        <th>PRODUCTS</th>
                        <th>CATEGORY</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>TOTAL</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        shopproduct.map((product, i) => {
                            return (
                                <tr key={i}>
                                    <td>{product.id}</td>
                                    <td><img width="40px" src={product.image} /></td>
                                    <td>{product.title}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                   
                                    <td>{product.quantity}</td>
                                    
                                    <td>{(product.price * product.quantity).toFixed(2)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
              <Link to='/buy'> <button className='btn btn-danger'>Buy Now</button></Link>

            </table>
            <Table>
                <tfoot>
                    <tr>
                        <td className='text-end' colSpan={7}><h3>Total price : {total} </h3></td>
                    </tr>
                </tfoot>
            </Table>
           
            <hr></hr>


       
        </div>
    </div>
  )
}
