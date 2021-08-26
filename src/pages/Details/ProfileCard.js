import React from 'react';
import {List, ListItem, ListItemText, Divider} from '@material-ui/core';

export function ProfileCard({properties, data}) {
  
  return (
    <List>
      {properties.map((property, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemText primary={property[0].toUpperCase() + property.slice(1)} secondary={data[property]} />
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  )
}