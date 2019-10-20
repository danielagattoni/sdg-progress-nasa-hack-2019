const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 4000);

/* App Middlewares */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/country_data', async (req, res) => {
 try {
  const { data } = await axios.get('https://asia-east2-sdg-progress.cloudfunctions.net/country_data')
  res.json(data)
 } catch (e) {
   console.log('e -->', e)
 }
})

app.post('/api/budget', (req, res) => {
  try {
    console.log('req.body: ', req.body)
    // Send a POST request
    // axios({
    //   method: 'post',
    //   url: '/user/12345',
    //   data: {
    //   firstName: 'Fred',
    //   lastName: 'Flintstone'
    // }
    // });
    res.status = 200;
    return res.json({
      message: 'success',
      status: 200,
    });

   } catch (e) {
     console.log('e -->', e)
   }
  
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});


app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});