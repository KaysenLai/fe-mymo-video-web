import React from 'react';
import LetterAvatar from './LetterAvatar';
import { Avatar } from '@material-ui/core';

interface MyAvatarProps {
  avatarSrc: string;
  fullName: string;
}

const MymoAvatar: React.FC<MyAvatarProps & React.HTMLAttributes<any>> = (props) => {
  const { avatarSrc, fullName, ...rest } = props;
  return (
    <>
      {avatarSrc === '' && <LetterAvatar fullName={fullName} {...rest} />}
      {avatarSrc.startsWith('http') && <Avatar alt={fullName} src={avatarSrc} {...rest} />}
    </>
  );
};

export default MymoAvatar;
