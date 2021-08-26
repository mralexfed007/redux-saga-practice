import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MovieIcon from '@material-ui/icons/Movie';
import Box from '@material-ui/core/Box';

export default function ScrollableTabsButtonForce({films}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          {films.map((film, index) => (
            <Tab key={index} label={film.data.title} icon={<MovieIcon />} />
          ))}
        </Tabs>
      </AppBar>
      <Box p={3}>
        {films[value].data.opening_crawl}
      </Box>
    </div>
  );
}