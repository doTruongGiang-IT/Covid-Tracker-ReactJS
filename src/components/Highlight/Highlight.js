import { Grid } from '@material-ui/core';
import React from 'react'
import HighlightCard from '../HighlightCard/HighlightCard';

const Highlight = ({reports}) => {
    const data = reports && reports.length ? reports[reports.length - 1] : [];

    const summary = [
        {
            title: 'Number of cases',
            count: data.Confirmed,
            type: 'confirmed'
        },
        {
            title: 'Number of recovered cases',
            count: data.Recovered,
            type: 'recovered'
        },
        {
            title: 'Number of deaths',
            count: data.Deaths,
            type: 'deaths'
        },
    ];

    return (
        <Grid container spacing={3}>
            {
                summary.map((item, index) => {
                    return <HighlightCard key={index} title={item.title} count={item.count} type={item.type} />
                })
            }
        </Grid>
    )
}

export default Highlight;