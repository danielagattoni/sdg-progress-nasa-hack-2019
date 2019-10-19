const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

app.set('port', process.env.PORT || 4000);

app.use(express.static(path.join(__dirname, 'build')));


app.get('/api/country_data', async (req, res) => {
 try {
  const { data } = await axios.get('https://asia-east2-sdg-progress.cloudfunctions.net/country_data')
  res.json(data)
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