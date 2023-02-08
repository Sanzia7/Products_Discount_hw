import React from "react"
import { useEffect, useState } from "react";
import Product from "../Product";
import s from "./style.module.css";

export default function ProdContainer() {

   const [products, setProducts] = useState([]);

   const [basket, setBasket] = useState([]);


   useEffect(() => {
      (async () => {
         const resp = await fetch("https://dummyjson.com/products");
         const data = await resp.json();
         const result = data.products.map(({ id, title, price, description, images, discountPercentage }) => ({ id, title, price, description, image: images[0], discountPercentage}));
         setProducts(result);
      })();
   }, []);


   const deleteProduct = delId => console.log(products.find(({ id }) => id === delId).title);

   const addToBasket = value => {
      const target = products.find(({ id }) => id === value);
      setBasket([...basket, { ...target, count: 1 }]);
   }
   console.log(basket);

   const countDiscountMin = +products.reduce(
      (prev, { discountPercentage }) => prev + (discountPercentage < 10), 0
   );

   const countDiscountMax = +products.reduce(
      (prev, { discountPercentage }) => prev + (discountPercentage > 10), 0
   );


   return (
      <div >
         
         <div className={s.container} >
            {
               products.map(product => <Product
                  key={product.id}
                  {...product}
                  deleteProduct={deleteProduct}
                  addToBasket={addToBasket}
               />)
            }
         </div>

         <div className={s.total}>
            <div className={s.count}>
               Total count of products:  {products.length}
            </div>
            <div className={s.count}>
               Total with good discount:  {countDiscountMax}
            </div>
            <div className={s.count}>
               Total with small discount:  {countDiscountMin}
            </div>
         </div>
      </div>
   )
}
/* {"id":1,
"title":"iPhone 9",
"description":"An apple mobile which is nothing like apple",
"price":549,
"discountPercentage":12.96,
"rating":4.69,"stock":94,"brand":"Apple","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/1/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/1/1.jpg","https://i.dummyjson.com/data/products/1/2.jpg","https://i.dummyjson.com/data/products/1/3.jpg","https://i.dummyjson.com/data/products/1/4.jpg","https://i.dummyjson.com/data/products/1/thumbnail.jpg"]}*/