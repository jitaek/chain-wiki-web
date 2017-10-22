import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export const FilterButton = props => {

    return (
        <RaisedButton labelStyle={{padding:'0px'}} fullWidth={true} label={props.label} onClick={props.onClick}/> 
    );

}

export default FilterButton