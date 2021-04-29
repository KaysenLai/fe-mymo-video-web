import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MymoAvatar from './MymoAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../types/state';
import { updateUserInfo } from '../store/actions/userLogin';
import compressImage from '../utils/compressImage';
import { UserInfo } from '../types';
import { infiniteQueryBehavior } from 'react-query/types/core/infiniteQueryBehavior';
import Button from '@material-ui/core/Button';
import theme from '../assets/theme';
import AccountSetting from './accountSetting';

const useStyles = makeStyles(() => ({
  root: {
    // width: '100%',
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
  followingNum: 0;
  followerNum: 0;
  avatar: string;
}

const ProfileInfo: React.FC<ProfileInfoProps & React.HTMLAttributes<any>> = (props) => {
  const { fullName, description, followerNum, followingNum, avatar, ...rest } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleOnChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files === null || files.length === 0) return;
    const file = files[0];
    const callback = (formData: FormData) => {
      formData.append('name', 'xxx');
      dispatch(updateUserInfo(formData));
    };
    compressImage(file, 400, 400, callback);
  };

  return (
    <>
      <div {...rest}>
        <div className={classes.root}>
          <div className={classes.avatarWarp}>
            <MymoAvatar avatarSrc={avatar} fullName={fullName} className={classes.avatar} />
          </div>
          {/*<input type="file" id="image_upload" accept="image/jpeg, image/jpg" onChange={handleOnChange} />*/}
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
