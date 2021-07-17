import React from 'react';
import { Grid, Card, Typography, CardContent, makeStyles } from '@material-ui/core';
import CountUp from 'react-countup';

const useStyles = makeStyles({
    wrapper: (props) => {
        if(props.type === 'confirmed') return {borderLeft: '5px solid #c9302c'};
        if(props.type === 'recovered') return {borderLeft: '5px solid #28a475'};
        if(props.type === 'deaths') return {borderLeft: '5px solid gray'};
    },
    title: {
        fontSize: 18,
        marginBottom: 5 
    },
    count: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});

const HighlightCard = ({title, count, type}) => {
    const styles = useStyles({type});

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card className={styles.wrapper}>
                <CardContent>
                    <Typography className={styles.title} component="p" variant="body2">{title}</Typography>
                    <Typography className={styles.count} component="span" variant="body2"><CountUp end={count || 0} duration={2} separator="." /></Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default HighlightCard;
