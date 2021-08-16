import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MymoAvatar from './MymoAvatar';
import moment from 'moment-timezone';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
interface Comment {
  text: string;
  time: string;
  avatar: string;
  name: string;
}
const useStyles = makeStyles(() => ({
  root: {
    margin: '20px 0',
    display: 'flex',
  },
  avatar: {
    marginRight: '20px',
  },
  wrap: {
    width: '100%',
  },
  nameWrap: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 500,
  },
}));

const Comment: React.FC<Comment> = (props: any) => {
  const classes = useStyles();

  const { text, time, avatar, name } = props;

  return (
    <div className={classes.root}>
      <MymoAvatar className={classes.avatar} avatarSrc={avatar} fullName={name} />
      <div className={classes.wrap}>
        <div className={classes.nameWrap}>
          <span className={classes.name}>{name}</span>
          <span>{moment(time).format('lll')}</span>
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
};

export default Comment;
