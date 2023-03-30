const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const stripe = require('stripe')("");

const app = express();

app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send("welcome in payment gateway");
})

app.post('payment',async (req,res)=>{
    try {
        const {product,token} = req.body;
        console.log("Product "+product);
        console.log("Price "+product.price);
        const idempontencyKey = uuid();

        const customer = await stripe.customers.create({
            email:token.email,
            source:token.id
        });
        const result = await stripe.charges.create({
            amount:product.price * 100,
            currency : 'usd',
            customer : customer.id,
            receipt_email : token.email,
            description : `purchase of ${product.name} `,
            shipping : {
                name : token.card.name,
                address : {
                    country: token.card.address_country
                }
            }
        },{idempontencyKey})

        res.status(200).json(result);
        
    } catch (e) {
        console.log(e);
    } 
})



app.listen(4000, () => console.log('port is listen on 4000'))