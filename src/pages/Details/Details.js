import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { Button, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import { getDetails } from '../../redux/reducers/peopleDetails/selectors';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ScrollableTabsButtonForce from './Tabs';
import { ProfileCard } from './ProfileCard';
import { TransportList } from './TransportList';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    flexGrow: 1,
    maxWidth: 800,
  }
}));

export default function Details() {
  const vehicleProperties = ['name', 'model', 'manufacturer', 'length', 'max_atmosphering_speed', 'vehicle_class'];
  const personProperties = ['name', 'gender', 'homeworld', 'birth_year'];
  const starshipProperties= ['name', 'model', 'manufacturer', 'length', 'max_atmosphering_speed', 'passengers']
  const details = useSelector(getDetails);
  const classes = useStyles();
  const {loading, data} = details;

  if (loading) {
    return (
      <h1 className="title">Loading...</h1>
    )
  } else {
    const {vehicles, starships, films} = data;
    return (
      <div className={classes.root}>
        <Grid container spacing={1} alignItems="center">
          <Grid item >
            <Link to='/'>
              <Button
              color="primary"
              startIcon={<ArrowBackIosIcon />}
              >
                Back
              </Button>
            </Link>
          </Grid>
          <Grid item >
            <Typography variant="subtitle1">
              Profile:
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={7} >
            <Card >
              <CardContent>
                <ProfileCard properties={personProperties} data={data} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5} container direction="column" spacing={2}>
            <Grid item>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                  <ListItemIcon>
                    <DriveEtaIcon />
                  </ListItemIcon>
                  <ListItemText primary="Vehicles" />
                </ListItem>
              </List>
              <Divider />
              <List component="nav" aria-label="secondary mailbox folders">
                {vehicles.map((vehicle, index) => (
                  <TransportList properties={vehicleProperties} transport={vehicle} key={index}/>
                ))}
              </List>
            </Grid>
            <Grid item>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                  <ListItemIcon>
                    <FlightTakeoffIcon />
                  </ListItemIcon>
                  <ListItemText primary="Starships" />
                </ListItem>
              </List>
              <Divider />
              <List component="nav" aria-label="secondary mailbox folders">
                {starships.map((starship, index) => (
                  <TransportList properties={starshipProperties} transport={starship} key={index}/>
                ))}
              </List>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h5" gutterBottom align="center">
                  Films:
                </Typography>
                <ScrollableTabsButtonForce films={films} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}