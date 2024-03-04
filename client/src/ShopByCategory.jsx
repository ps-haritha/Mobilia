import React from 'react'
import './ShopByCategory.css'

function ShopByCategory() {
  return (
    <>
    <div className='category'>
       <center> <p className='shopp'>Shop By Categories</p></center>
       <a href="/singleview/Sofa">
       <img src="/image/sofa.png" className='shop' />
       </a>
       
        <a href="/singleview/chair">
        <img src="/image/chair.png"  className='shop' />
        </a>

        <a href="/singleview/Dining Sets">
        <img src="/image/dine.png"  className='shop' />
        </a>

        <a href="/singleview/Study Table">
        <img src="/image/study.png"  className='shop' />
        </a>

        <a href="/singleview/Recliners">
        <img src="/image/recliner.png"  className='shop' />
        </a>
        
        <a href="/singleview/Bed">
        <img src="/image/bed.png"  className='shop' />
        </a>
        
        <a href="/singleview/Centre table"><img src="/image/center table.jpg"  className='shop' /></a>
        
        <a href="/singleview/Wardrobe"><img src="/image/wardrobe.png"  className='shop' /></a>
        <a href="/singleview/Bar Furniture">
        <img src="/image/bar.png"  className='shop' />
        </a>
        


    </div>
    
    
    </>
  )
}

export default ShopByCategory
