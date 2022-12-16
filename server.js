const express = require('express');
const filteredLaptops = require("./index");
const app = express();


app.set('json spaces', 2);

app.get('/laptops/:productName', async (req, res) => {

    const data = await filteredLaptops.scraping_service(req.params.productName);
    res.json(data);
});

app.listen(3000, () => {
  console.log('API listening on port 3000');
});