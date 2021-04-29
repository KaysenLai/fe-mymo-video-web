import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MymoAvatar from './MymoAvatar';
import theme from '../assets/theme';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    // background: '#777777',
    padding: theme.spacing(2),
    borderBottom: 'solid #777777 2px',
  },
  img: {
    width: '240px',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
  },
  avatar: {
    marginRight: theme.spacing(2),
    width: '50px',
    height: '50px',
  },
  name: {
    fontWeight: 600,
    fontSize: '20px',
    fontFamily: 'Poppins',
    marginRight: '20px',
    color: 'white',
  },
  desc: {
    color: theme.palette.grey[500],
    maxWidth: '600px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));

interface UserCardProps {
  _id: string;
  avatar: string;
  fullName: string;
  followerNum: number;
  desc: string;
}

const UserCard: React.FC<UserCardProps> = (props) => {
  const { _id, avatar, followerNum, fullName, desc } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <MymoAvatar avatarSrc={avatar} fullName={fullName} className={classes.avatar} />
      </Grid>

      <Grid item>
        <Grid>
          <Link to={`/profile/${_id}`}>
            <span className={classes.name}>{fullName}</span>
          </Link>
          <span>{followerNum} Followers</span>
        </Grid>
        <Grid>
          <p className={classes.desc}>{desc}</p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserCard;
