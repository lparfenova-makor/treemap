import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



const product = [
    'Company',
    'Product by company',
    'Employee'
]

const team = [
    'Product',
    'Team',
    'Desk',
    'Employee by desk'
]


function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName !== name
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect(prop) {
    const classes = useStyles();
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    // const [filter, setFilter] = React.useState([]);

    const handleChange = (event) => {
        setPersonName(event.target.value); //only for first filter
        prop.parents(event.target.value)
    };



    return (


        <div className='multipleSelect' style={{ width: '200px' }}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-name-label">Product</InputLabel>
                <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    value={personName}
                    onChange={handleChange}
                    input={<Input />}
                    MenuProps={MenuProps}
                >
                    {product.map((name) => (
                        <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-name-label">Team</InputLabel>
                <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    value={personName}
                    onChange={handleChange}
                    input={<Input />}
                    MenuProps={MenuProps}
                >
                    {team.map((name) => (
                        <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </div>


    );
}