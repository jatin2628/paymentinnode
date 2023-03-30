import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';

function App() {
  const [product,setProduct] = useState({
    name:'React by FB',
    price:10,
    productBy:'FaceBook'
  })

  const makePayment = token => {
    const body = {
      token,
      product
    }

    const headers = {
      'Content-Type':'application/json'
    }

    return fetch('http://localhost:4000/payment',{
      method:'POST',
      headers,
      body:JSON.stringify(body)
    }).then(response => {
      console.log('Response ',response);
      const {status} = response;
      console.log(status);
    }).catch(e => console.log(e))
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <StripeCheckout stripeKey="pk" token={makePayment} name="Buy React">
          <button className='btn btn-large green'>Buy React in {product.price} $</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
