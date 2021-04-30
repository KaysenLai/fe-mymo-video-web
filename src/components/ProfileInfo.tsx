import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MymoAvatar from './MymoAvatar';
import theme from '../assets/theme';
import AccountSetting from './AccountSetting';
import FollowButton from './FollowButton';

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
      fontSize: '17px',
      lineHeight: '22px',
      maxWidth: '700px',
      marginTop: '4px',
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
  _id: string;
  fullName: string;
  description: string;
  followingNum: number;
  followerNum: number;
  avatar: string;
  isMyProfile: boolean;
  isFollowing: boolean;
}

const ProfileInfo: React.FC<ProfileInfoProps & React.HTMLAttributes<any>> = (props) => {
  const { _id, fullName, description, followerNum, followingNum, avatar, isMyProfile, isFollowing, ...rest } = props;
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
              {isMyProfile && <AccountSetting fullName={fullName} avatarSrc={avatar} description={description} />}
              {!isMyProfile && <FollowButton isFollowing={isFollowing} userId={_id} />}
            </div>

            <div className={classes.descWrap}>
              <p className={classes.desc}>
                {description === '' ? "You don't have a description right now." : description}
              </p>
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
