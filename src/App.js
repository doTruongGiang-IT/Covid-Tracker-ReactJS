import { Container, Typography } from '@material-ui/core';
import { sortBy } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Country from './components/Country/Country';
import Highlight from './components/Highlight/Highlight';
import Summary from './components/Summary/Summary';
import { getCountries, getReportsByCountry } from './services';
import '@fontsource/roboto';

function App() {
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState('');
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getCountries()
      .then(res => {
        const countries = sortBy(res.data, 'Country');
        setCountries(countries);
        setCountryId('vn');
      })
      .catch(error => {
        console.log(error.message);
      });    
  }, []);

  const handleChange = (e) => {
    setCountryId(e.target.value);
  };

  useEffect(() => {
    if(countryId) {
      const {Slug} = countries.find((country) => country.ISO2.toLowerCase() === countryId);
      getReportsByCountry(Slug)
        .then(res => {
          res.data.pop();
          setReports(res.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    };
  }, [countries, countryId]);

  return (
    <Container style={{marginTop: '20px'}}>
      <Typography variant="h2" component="h2">COVID-19 figures</Typography>
      <Typography>{moment().format('LLL')}</Typography>
      <Country countries={countries} handleChange={handleChange} value={countryId} />
      <Highlight reports={reports} />
      <Summary reports={reports} selectedCountryId={countryId} />
    </Container>
  );
}

export default App;
