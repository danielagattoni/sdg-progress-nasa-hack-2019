import React, { useCallback, useEffect, useState } from 'react';
import {
  ThemeProvider,
  Button,
  styled,
  css,
  FieldSet,
  InputField,
  Flex,
  Box,
  Paragraph
} from 'fannypack';
import 'typeface-roboto-mono';
import axios from 'axios';
import { get, isEmpty } from 'lodash';
import BarChartModule from './BarChartModule';
import logo from './sdg-progress-logo.svg';
 
const theme = {
  global: {
    fontFamily: 'Roboto Mono',
    fontSize: 20,
    base: css`
      html,
      body {
        color: #000;
        overflow-x: inherit;
      }
    `
  },
  palette: {
    primary: 'blue'
  },
  layout: {
    mobileBreakpoint: 520,
    tabletBreakpoint: 960
  },
  Button: {
    disabled: css`
      opacity: 0.2
    `
  },
  Text: css`
    font-weight: 300;
    color: #000;
  `,
  FieldSet: {
    base: css`
      font-size: 0.8rem;
      text-align: left;
    `,
  }
}

const Container = styled.div`
  text-align: center;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 1fr;

  @media screen and (min-width: 500px) {
    grid-template-columns: 5rem 3fr 1fr 5rem;
  }
`

const StyledHeader = styled.header`

  @media screen and (min-width: 500px) {
    grid-column-start: 1;
    grid-column-end: -1;
    grid-row-start: 2;
  }
`

const StyledNav = styled.nav`
  background-color: #fff;
  border-bottom: 1px dashed #000;

  @media screen and (min-width: 500px) {
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: -1;
  }
`

const StyledMain = styled.main`
  background-color: #fff;
  border: 2px dashed #000;

  @media screen and (min-width: 500px) {
    grid-row: 3 / 4;
    grid-column: 2;
  }
`

const StyledAside = styled.aside`
  background-color: #fff;
  border: 2px dashed #000;
  display: flex;

  @media screen and (min-width: 500px) {
    grid-row: 3 / span 2;
    grid-column: 3;
    min-height: 34rem;
  }
`

const StyledFooter = styled.footer`
  border-top: 1px dashed #000;

  @media screen and (min-width: 500px) {
    grid-column-start: 1;
    grid-column-end: -1;
  }
`

const StyledMenu = styled.ul`
  display: flex;
  justify-content: space-around;
  && li {
    justify-self: space-between;
  }
`
// fannypack select didnt work well, so I changed it by a normal select
// https://css-tricks.com/styling-a-select-like-its-2019/
const StyledSelect = styled.select`
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: .6em 1.4em .5em .8em;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
  border-radius: .3em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
`
const AppLogo = styled.img`
  height: 20vmin;
`

const mocked_data = {
  "3.1": {
    "maternalMortalityRate": 5.94881382022147
  },
  "3.2": {
    "u5MortalityRate": 3.688607,
    "neonatalMortalityRate": 2.271836
  },
  "3.7": {
    "modernContraceptiveRate": 64.65,
    "adolescentFertilityRate": ""
  }
};

function App() {
  const [data, setData] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState({
    countryCode: "AUS",
    budgets: {
      defenceBudget: "",
      economicAffairsBudget: "",
      educationBudget: "",
      environmentProtectionBudget: "",
      generalPublicServicesBudget: "",
      healthBudget: "",
      housingAndCommunityAmenitiesBudget: "",
      publicOrderAndSafetyBudget: "",
      recreationCultureAndReligionBudget: "",
      socialProtectionBudget: ""
    }
  })
  const [chartData, seChartData] = useState(null)

  const getCountries = useCallback(async () => {
    try {
      const resp = await axios.get('/api/country_data');
      const payload = get(resp, 'data.data', [])
      setData(payload)
    } catch (e) {
      console.log('error:', e)
    }
  }, []);

  // to control form input values via state `selectedCountry`
  const handleInput = (fieldName, value) => {
    setSelectedCountry({
      ...selectedCountry,
      budgets: {
        ...selectedCountry.budgets,
        [fieldName]: value
      }
    })
  }

  // when `submitData` we trigger the express api `/api/budget`
  const submitData = async () => {
    try {
      const resp = await axios({
        method: 'post',
        url: '/api/budget',
        data: selectedCountry
      });
      const data = get(resp, 'data', null)
      seChartData(data)
      console.log('submitData data: ', data)
    } catch (e) {
      console.log('error:', e)
    }
  }

  // when `getCountries` change, trigger this effect
  useEffect(() => {
    getCountries()
  }, [getCountries])

  // everytime `data` change, trigger this effect
  useEffect(() => {
    if (!isEmpty(data)) {
      const selectedTarget = data.find(country => country.countryCode === 'AUS')
      setSelectedCountry(selectedTarget)
    }
  }, [data])

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StyledNav>
          <StyledMenu>
            <li>SDG Progress</li>
            <li>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://2019.spaceappschallenge.org/challenges/living-our-world/smash-your-sdgs/teams/team-amulen/members">
                The Team
              </a>
            </li>
            <li>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://2019.spaceappschallenge.org/challenges/living-our-world/smash-your-sdgs/teams/team-amulen/project">
                About the project
              </a>
            </li>
          </StyledMenu>
        </StyledNav>
        <StyledHeader>
          <Flex alignItems="center" column padding="major-2">
            <AppLogo src={logo} alt="SDG Progress logo" />
            <Paragraph style={{
              width: "60%",
              paddingTop: '1rem'
            }}>
              A tool that simulates and visualizes the progress of a United Nation’s Sustainable development Goal, one chart at a time.
            </Paragraph>
          </Flex>
        </StyledHeader>
        <StyledMain>
          <Box width="100%" padding="major-3">
            <BarChartModule data={mocked_data} />
          </Box>
        </StyledMain>
        <StyledAside>
          <Box width="100%" padding="major-3">
            <Paragraph use="h2" isSubHeading>Add a Government Budget (?)</Paragraph>
            {!data && < div>loading...</div>}
            {data && selectedCountry && (
              <FieldSet>
                <StyledSelect
                  placeholder="Select a country..."
                  value={selectedCountry.countryCode}
                  onChange={e => {
                    const selectedTarget = data.find(country => country.countryCode === e.target.value)
                    handleInput('countryCode', e.target.value)
                    setSelectedCountry(selectedTarget)
                  }}>
                  {data && data.map(item => <option key={item.countryCode} value={item.countryCode}>{item.country}</option>)}
                </StyledSelect>
                <InputField onChange={(e) => {
                  handleInput(e.target.name, e.target.value)
                }} name="defenceBudget" label="Defence" value={selectedCountry.budgets.defenceBudget.toString()} />
                <InputField onChange={(e) => {
                  handleInput(e.target.name, e.target.value)
                }} name="economicAffairsBudget" label="Economic affairs" value={selectedCountry.budgets.economicAffairsBudget.toString()} />
                <InputField onChange={(e) => {
                  handleInput(e.target.name, e.target.value)
                }} name="educationBudget" label="Education" value={selectedCountry.budgets.educationBudget.toString()} />
                <InputField onChange={(e) => {
                  handleInput(e.target.name, e.target.value)
                }} name="environmentProtectionBudget" label="Environment protection" value={selectedCountry.budgets.environmentProtectionBudget.toString()} />
                <InputField onChange={(e) => {
                  handleInput(e.target.name, e.target.value)
                }} name="generalPublicServicesBudget" label="General public services" value={selectedCountry.budgets.generalPublicServicesBudget.toString()} />
                <InputField onChange={(e) => {
                  handleInput(e.target.name, e.target.value)
                }} name="healthBudget" label="Health" value={selectedCountry.budgets.healthBudget.toString()} />
                <InputField onChange={(e) => {
                  handleInput(e.target.name, e.target.value)
                }} name="housingAndCommunityAmenitiesBudget" label="Housing and community amenities" value={selectedCountry.budgets.housingAndCommunityAmenitiesBudget.toString()} />
                <InputField onChange={(e) => {
                  handleInput(e.target.name, e.target.value)
                }} name="publicOrderAndSafetyBudget" label="Public order and safety" value={selectedCountry.budgets.publicOrderAndSafetyBudget.toString()} />
                <InputField onChange={(e) => {
                  handleInput(e.target.name, e.target.value)
                }} name="recreationCultureAndReligionBudget" label="Recreation culture and religion" value={selectedCountry.budgets.recreationCultureAndReligionBudget.toString()} />
                <InputField onChange={(e) => {
                  handleInput(e.target.name, e.target.value)
                }} name="socialProtectionBudget" label="Social protection" value={selectedCountry.budgets.socialProtectionBudget.toString()} />

                <Button width="100%" onClick={() => submitData()}>Submit</Button>
              </FieldSet>
            )}
          </Box>
        </StyledAside>
        <StyledFooter>
          <Flex column padding="major-3">
            <Paragraph>
              Designed, built, and maintained by Daniela, Melissa and Craig
          </Paragraph>
            <Paragraph>
              NASA Space Apps 2019
          </Paragraph>
          </Flex>
        </StyledFooter>
      </Container>
    </ThemeProvider>

  );
}

export default App;
