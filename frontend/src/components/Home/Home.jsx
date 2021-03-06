import React, { useState, useEffect } from 'react';
import { getProducts } from '../../api';

import Search from '../Search/Search';
import Card from '../Card/Card';

import './home.scss';

const Home = () => {
  const [soldProducts, setSoldProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadSoldProducts = async () => {
    const products = await getProducts('sold');

    try {
      if (products) {
        setSoldProducts(products);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  const loadNewProducts = async () => {
    const products = await getProducts('createdAt');

    try {
      if (products) {
        setNewProducts(products);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  useEffect(() => {
    loadSoldProducts();
    loadNewProducts();
  }, []);

  return (
    <>
      <Search />

      <div className='container'>
        <section className='home-section'>
          <div>
            <h2 className='title'>Best Sellers</h2>

            <div className='home-section__best-sellers'>
              {soldProducts &&
                soldProducts.map(product => (
                  <Card key={product._id} product={product} />
                ))}
            </div>
          </div>
          <div>
            <h2 className='title'>New Products</h2>

            <div className='home-section__new-products'>
              {newProducts &&
                newProducts.map(product => (
                  <Card key={product._id} product={product} />
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
