import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MymoAvatar from './MymoAvatar';
import theme from '../assets/theme';
import AccountSetting from './accountSetting';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  name: {
    fontSize: '36px',
    fontWeight: 600,
    marginRight: '30px',
  },
  nameWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  desc: {
    fontSize: '18px',
  },
  descWrap: {
    width: '100%',
    height: '92px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: '4px',
    '& span': {
      fontSize: '16px',
      fontWeight: 500,
      marginRight: '24px',
    },
    '& p': {
      fontSize: '18px',
      color: theme.palette.grey[400],
      marginRight: '30px',
    },
  },
  avatar: {
    margin: '6px 0',
    fontSize: '60px',
    width: '140px',
    height: '140px',
  },
  avatarWarp: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 60px',
  },
}));

interface ProfileInfoProps {
  fullName: string;
  description: string;
  followingNum: number;
  followerNum: number;
  avatar: string;
}

const ProfileInfo: React.FC<ProfileInfoProps & React.HTMLAttributes<any>> = (props) => {
  const { fullName, description, followerNum, followingNum, avatar, ...rest } = props;
  const classes = useStyles();
  return (
    <>
      <div {...rest}>
        <div className={classes.root}>
          <div className={classes.avatarWarp}>
            <MymoAvatar avatarSrc={avatar} fullName={fullName} className={classes.avatar} />
          </div>
          <div>
            <div className={classes.nameWrap}>
              <h3 className={classes.name}>{fullName}</h3>
              <AccountSetting fullName={fullName} avatarSrc={avatar} description={description} />
            </div>

            <div className={classes.descWrap}>
              <p className={classes.desc}>{description}</p>
              <div>
                <span>Follower: {followerNum}</span>
                <span>Following: {followingNum}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
