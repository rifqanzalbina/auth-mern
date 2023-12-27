import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

// Tidak menggunakan Redux Store karena data Product -
// hanya akan diakses di komponen ini saja (tidak seperti data users)

const ProductList = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        getProducts();
    }, []); // empty array karena fungsi ini harus running ketika unmounted

    const getProducts = async() => {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
    }

    const deleteProduct = async(productId) => {
        await axios.delete(`http://localhost:5000/products/${productId}`);
        getProducts();
    }

  return (
    <div>
        <h1 className='title'>Products</h1>
        <h2 className='subtitle'>List of Products</h2>
        <Link to={'/products/add'} className='button is-primary mb-2'>Add New Product</Link>
        <table className='table is-striped is-fullwidth mb-3'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Created By</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={product.uuid}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.user.name}</td>
                        <td>
                            <Link to={`/products/edit/${product.uuid}`} className="button is-small is-info mr-2" >Edit</Link>
                            <button onClick={() => deleteProduct(product.uuid)} className="button is-small is-danger">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

// 3:08:35

export default ProductList