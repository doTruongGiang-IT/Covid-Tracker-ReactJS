import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import HighMap from '../HighMap/HighMap';
import LineChart from '../LineChart/LineChart';

const Summary = ({reports, selectedCountryId}) => {
    const[mapData, setMapData] = useState({});

    useEffect(() => {
        if(selectedCountryId) {
            import(`@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`)
                .then(res => {
                    setMapData(res);
                })
                .catch(error => {
                    console.log(error.message);
                });
        };
    }, [selectedCountryId]);

    return (
        <div style={{marginTop: '10px'}}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                    <LineChart data={reports} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <HighMap mapData={mapData} />
                </Grid>
            </Grid>
        </div>  
    )
}

export default Summary;
