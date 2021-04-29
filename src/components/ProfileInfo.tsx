import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MymoAvatar from './MymoAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../types/state';
import { updateUserInfo } from '../store/actions/userLogin';
import compressImage from '../utils/compressImage';
import { UserInfo } from '../types';

const useStyles = makeStyles(() => ({
  avatar: {
    width: '110px',
    height: '110px',
  },
  avatarWarp: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
const ProfileInfo: React.FC<React.HTMLAttributes<any>> = (props) => {
  const { ...rest } = props;
  const dispatch = useDispatch();
  const userLogin = useSelector((state: State) => state.userLogin);
  const { userInfo } = userLogin;
  const { avatar, name } = userInfo;
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
      <Grid container {...rest}>
        <Grid item xs={4} className={classes.avatarWarp}>
          <MymoAvatar avatarSrc={avatar} fullName={name} className={classes.avatar} />
        </Grid>
        {/*<input type="file" id="image_upload" accept="image/jpeg, image/jpg" onChange={handleOnChange} />*/}
        <Grid item xs={8}>
          <div>name</div>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileInfo;
