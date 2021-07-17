import { FormControl, FormHelperText, InputLabel, NativeSelect, makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: `${theme.spacing(3)}px 0`, 
    }
}));

const Country = ({value, handleChange, countries}) => {
    const styles = useStyles();

    return (
        <FormControl className={styles.formControl}>
            <InputLabel htmlFor="country-selector" shrink>Countries</InputLabel>
            <NativeSelect value={value} onChange={handleChange} inputProps={{name: 'country', id: 'country-selector'}}>
                {
                    countries.map((country, index) => {
                        return <option key={country.ISO2} value={country.ISO2.toLowerCase()}>{country.Country}</option>
                    })
                }
            </NativeSelect>
            <FormHelperText>Please choose a country</FormHelperText>
        </FormControl>
    )
}

export default Country;
