import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import UserNavigation from './UserNavigation';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function Cart() {

    const user_id = JSON.parse(localStorage.getItem('login_id'))
    const navigate = useNavigate()

    const [input, setInput] = useState([])
    useEffect(() => {
        axios.get(` http://localhost:2000/api/cart/viewCart/${user_id}`).then(response => {
            const data = response.data.details
            setInput(data)
        }).catch(error => {
            console.log(error);
        })
    }, [])
    console.log('input', input);
    const remove = (id) => {
        axios.post(`http://localhost:2000/api/cart/delete/${user_id}/${id}`).then(response => {
            toast.success(response.data.message)
            //window.location.reload()   - for reloading
            // setTimeout(() => {
            //     navigate('/cart')
            // }, 1000);      
            const filterData = input.filter((data) => {
                return data.furniture_id != id

            })
            setInput(filterData)
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            <div>
                <UserNavigation />
            </div>
            <div>
                {
                    input.map(item => (
                        <div className="card">
                            <div className="card-info">
                                <img src={`/image/${item.image}`} alt="i" className='card-avatar' />
                                <div className="card-title">{item.type} {item.name}</div>
                                <div className="card-subtitle">Price : {item.price}</div>
                                <div className="card-subtitle">Age : {item.age}</div>
                            </div>
                            <div>
                                <button className='smlbtn'>Buy</button><br />
                                <button className='smlbtn' onClick={() => { remove(item.furniture_id) }}>Remove</button>
                            </div>
                        </div>
                    ))
                }
            </div>



        </>
    )
}

export default Cart
