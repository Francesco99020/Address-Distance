const express = require('express');
const cors = require('cors');
const { getDistancesFromTarget } = require('./address');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/address/closest', async (req, res) => {
    try{
        //get request and do work
        const request = req.body.message;
        const target = request.targetAddress;
        const compares = request.compareAddresses;

        const response = await getDistancesFromTarget(target, compares);
        //return response
        res.json({message: response});
    }catch(error){
        console.error('Internal Server Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});