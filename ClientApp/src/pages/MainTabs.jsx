import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Packages from '../components/Packages';
import Transfers from '../components/Transfers';
import Hotels from '../components/Hotels';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function setProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function MainTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
        >


          <Tab label="VENTAS" {...setProps(0)} />
          <Tab label="PAQUETES" {...setProps(1)} />
          <Tab label="ALOJAMIENTOS" {...setProps(2)} />
          <Tab label="TRASLADOS" {...setProps(3)} />
          <Tab label="EXCURSIONES" {...setProps(4)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        VENTAS
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Packages />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Hotels/>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Transfers/>
      </TabPanel>

      <TabPanel value={value} index={4}>
        EXCURSIONES
      </TabPanel>



    </div>
  );
}