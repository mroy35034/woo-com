import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../Components/Shared/Spinner/Spinner';
import { useFetch } from '../../Hooks/useFetch';
import { useBASE_URL } from '../../lib/BaseUrlProvider';
import Breadcrumbs from '../../Shared/Breadcrumbs';
import Product from '../../Shared/Product';
import CategoryHeader from '../Home/Components/CategoryHeader';
import "./ProductCategory.css";

const ProductCategory = () => {
   const BASE_URL = useBASE_URL();
   const { category } = useParams();
   const [url, setUrl] = useState(category);
   const { data: productByCategory, loading } = useFetch(`${BASE_URL + url}`);
   const [filters, setFilters] = useState('best_match');
   const [brands, setBrands] = useState({ brand: [] });
   const [getBrand, setGetBrand] = useState(["all"]);
   const [products, setProducts] = useState([]);

   // console.log(products);


   useEffect(() => {
      if (productByCategory) {
         let o = productByCategory.map(p => p?.brand).filter((p, i, fp) => {
            return p && fp.indexOf(p) === i;
         });
         setGetBrand(o);
      }
   }, [productByCategory]);

   // filter product by price
   useEffect(() => {

      let filterUrl;

      if (category && filters) {
         filterUrl = `api/product-by-category?category=${category}&filters=${filters}`;
         setUrl(filterUrl);
      }
   }, [category, filters]);

   useEffect(() => {
      let g;
      if (brands.brand.length > 0) {
         let bb = brands.brand.length > 0 && brands.brand.map(p => p);
         g = productByCategory && productByCategory.filter(p => bb.includes(p?.brand));

      } else {
         g = productByCategory;
      }

      return setProducts(g);
   }, [brands, productByCategory]);

   // if (loading) return <Spinner></Spinner>;

   const handleChange = (e) => {
      const { value, checked } = e.target;
      const { brand } = brands;
      if (checked) {
         setBrands({
            brand: [...brand, value],
         });
      } else {
         setBrands({
            brand: brand.filter((e) => e !== value)
         });
      }
   }

   return (
      <div className="section_default">
         <CategoryHeader></CategoryHeader>
         <div className='container'>
            <Breadcrumbs></Breadcrumbs>
            <div className="p-2 border">
               <h5>{category}</h5>
               <small className="badge bg-primary">{category}</small>
            </div>
            <div className="category_header py-4">
               <div className="sort_price">
                  <span>Sort By </span>
                  <select name="filter" id="" onChange={(e) => setFilters(e.target.value)}>
                     <option value="best_match">Best Match</option>
                     <option value="lowest">Lowest</option>
                     <option value="highest">Highest</option>
                  </select>
               </div>

               <div className='my-3'>
                  <small><strong>Choose By Brands</strong></small>
                  <div className="row">
                     {
                        getBrand && getBrand.map((b, i) => {
                           // console.log(b);
                           return (
                              <div className="col-12" key={i}>
                                 <label htmlFor={b} >
                                    <input type="checkbox" className='me-3' name={b} id={b} value={b} onChange={handleChange} />
                                    {b}
                                 </label>
                              </div>

                           )
                        })
                     }
                  </div>
               </div>
            </div>
            <div className="row">
               {
                  loading ? <Spinner /> : products && products.map(p => {
                     return (
                        <div key={p?._id} className="col-lg-3 mb-4">
                           <Product product={p}></Product>
                        </div>
                     )
                  })
               }
            </div>
         </div>
      </div>
   );
};

export default ProductCategory;