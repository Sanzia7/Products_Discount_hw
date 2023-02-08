import React from 'react'
import s from './style.module.css'

export default function Product({ id, title, price, description, image, discountPercentage, deleteProduct, addToBasket }) {
   return (
      <div className={s.card}>
         <div>
            <img src={image} alt={title} />
            <p>{title}</p>
            <p>{price}</p>
            <p>{description}</p>
            <p>{discountPercentage}</p>
            <button onClick={() => deleteProduct(id)}>Delete</button>
            <button onClick={() => addToBasket(id)}>Add</button>
         </div>

      </div>
   )
}
// discountPercentage: