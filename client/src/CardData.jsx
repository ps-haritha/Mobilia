import React from 'react'

function CardData({ details, view, msg }) {


    console.log(view, 'view');
    console.log(msg, 'msg');

    return (

        <div className='furnitureCard' data-aos="flip-up">
            <img src={`/image/${details.image}`} alt="img" style={{ width: '200px', height: '150px' }} />
            <p> {details.name} </p>
            <p> Type : {details.type}</p>
            <p> Description :  {details.description}</p>
            <p> Age:  {details.age}</p>
            <p>Price:  {details.price}</p>
            {
                view == '' ? <button className='btnadd' onClick={msg}>Add to Cart</button> : <button className='pdtbtn' onClick={() => { view(details._id) }}>View product</button>
            }



        </div>


    )
}

export default CardData;
