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

app.post('/api/budget', async (req, res) => {
  try {
    // Send a POST request
    const { data } = await axios({
      method: 'post',
      url: 'https://asia-east2-sdg-progress.cloudfunctions.net/sdg_predictions',
      data: {
        country: req.body.country ,
        defence_budget: req.body.defenceBudget,
        economic_affairs_budget: req.body.economicAffairsBudget ,
        education_budget: req.body.educationBudget ,
        environment_protection_budget: req.body.environmentProtectionBudget ,
        general_public_services_budget: req.body.generalPublicServicesBudget ,
        health_budget: req.body.healthBudget ,
        housing_and_community_amenities_budget: req.body.housingAndCommunityAmenitiesBudget ,
        public_order_and_safety_budget: req.body.publicOrderAndSafetyBudget ,
        recreation_culture_and_religion_budget: req.body.recreationCultureAndReligionBudget ,
        social_protection_budget: req.body.socialProtectionBudget
      }
    });
    console.log('data ~~~~ ', data)
    res.json(data)
   } catch (e) {
     console.log('api/budget errorr ------> ', e)
   }
  
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});


app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});