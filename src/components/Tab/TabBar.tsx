// https://material-ui.com/components/tabs/#tabs
import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';

const a11yProps = (index: any) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(5),
  },
}));

interface TabBarProps {
  tabs: string[];
  tabNum: number;
  handleChange: any;
  userId?: string;
}

const TabBar: React.FC<TabBarProps> = (props) => {
  const { tabs, tabNum, handleChange, userId } = props;
  const history = useHistory();
  const classes = useStyles();
  const handleOnClick = (item: string) => {
    if (userId) history.push(`/profile/${userId}?tab=${item}`);
    else history.push(`/profile?tab=${item}`);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={tabNum}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {tabs.map((item, index) => (
            <Tab
              onClick={() => {
                handleOnClick(item);
              }}
              label={item}
              key={index}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
    </div>
  );
};

export default TabBar;
