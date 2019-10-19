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
  Paragraph,
  Select
} from 'fannypack';
import 'typeface-roboto-mono';
import axios from 'axios';

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
  `
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

function App() {

  const [ data, setData ] = useState([])

  const getCountries = useCallback(async () => {
    try {
      const response = await axios.get('/api/country_data');
      console.log('response FE: --> ', response)
      // setData(data)
    } catch(e) {
      console.log('error:', e)
    }
  }, []);

  useEffect(() => {
    getCountries()
  }, [getCountries])

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
            <h1>SDG Progress</h1>
            <Paragraph style={{
              width: "60%",
            }}>
              A tool that simulates and visualizes the progress of a United Nation’s Sustainable development Goal, one chart at a time.
            </Paragraph>
          </Flex>
        </StyledHeader>
        <StyledMain>
          <Box width="100%" padding="major-3">
            Charts goes here
          </Box>
        </StyledMain>
        <StyledAside>
          <Box width="100%" padding="major-3">
            <Paragraph use="h2" isSubHeading>Add a Government Budget (?)</Paragraph>
            <FieldSet>
              {/* <Select
                options={data.data && data.data.map(item => ({
                  label: item.country, value: item.countryCode
                }))
              }
              /> */}
              <InputField name="total" label="label" />
              <InputField name="total" label="label" />
              <InputField name="total" label="label" />
              <InputField name="total" label="label" />
              <InputField name="total" label="label" />
              <Button width="100%">Submit</Button>

            </FieldSet>

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
