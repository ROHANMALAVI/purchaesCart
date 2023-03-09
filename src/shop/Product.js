import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';


export default function Product() {
    let [quantitytotal, setQuantityTotal] = useState(0);
    let [products, setProducts] = useState([]);

    useEffect((e) => {

        axios.get('https://fakestoreapi.com/products').then((result) => {
            console.log(result.data);
            let myproducts = result.data.map((product, i) => {
                return { ...product, quantity: 0 }
            })

            setProducts(myproducts);
        }, (err) => {
            console.log(err);

        });
    }, []);

    useEffect(() => {
        let allquantity = 0;

        products.forEach(product => {
            allquantity += product.quantity
        });
        setQuantityTotal(allquantity);

        let shopproduct = products.filter((product, i) => {
            if (product.quantity > 0)
                return product;
        });

        localStorage.setItem("shopproduct", JSON.stringify(shopproduct));

    }, [products]);

    function increaseQuantity(e, id) {

        e.preventDefault();
        let myproducts = products.map((product, i) => {
            if (product.id === id) {

                product.quantity += 1;
            }
            return product;

        });
        setProducts(myproducts);
    }

    function decreaseQuantity(e, id) {

        e.preventDefault();
        let myproducts = products.map((product, i) => {
            if (product.id === id) {
                if (product.quantity > 0)
                    product.quantity -= 1;
            }
            return product;
        })
        setProducts(myproducts);
    }

    return (
        <div>
            <div className='row'>
                <div className="sticky-top">
                    <h1 className='text-center text-light rounded-bottom bg-dark pt-5'><b><i> E-Commerce Shopping...!</i></b><i class="fa fa-shopping-cart" style={{ "font-size": "36px" }}></i>
                        <h1 className='text-end pb-4 p-4'><Link to={'/list'}> <button className='btn btn-success border border-white '>Go To Cart </button> <Badge pill bg="warning" text="dark">{quantitytotal}

                        </Badge>{' '}</Link>
                        </h1></h1>
                </div>
                <div className='col-lg-12 d-flex flex-wrap  ' >
                    {
                        products.map((product, i) => (
                            <div className="card col-lg-4 border border-shadow  " key={i}>
                                <div className="card-body  bg-white m-2">
                                    <span>{product.id}</span>
                                    <h5 className="text-center"><b>{product.category}</b></h5>
                                    <div className='text-center' ><img src={product.image} width={200} height={200}></img></div>

                                    <h5 className="card-text text-center"><b>Price: {product.price}&#x20B9;</b></h5>
                                    <div className='text-center' >
                                        <button className='btn btn-danger' onClick={(e) => { decreaseQuantity(e, product.id) }}>-</button>
                                        <span>&nbsp;&nbsp;&nbsp; {product.quantity}  &nbsp;&nbsp;</span>
                                        <button className='btn btn-warning' onClick={(e) => { increaseQuantity(e, product.id) }}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>


            </div>

        </div>
    )
}
