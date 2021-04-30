import React from 'react';
import { Button } from '@material-ui/core';
import GhostButton from './GhostButton';
import { useDispatch } from 'react-redux';
import { updateFollowUser, updateUnfollowUser } from '../store/actions/profile';
interface FollowButtonProps {
  isFollowing: boolean;
  userId: string;
}
const FollowButton: React.FC<FollowButtonProps> = (props) => {
  const { isFollowing, userId } = props;
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(updateFollowUser(userId));
  };

  const handleUnfollow = () => {
    dispatch(updateUnfollowUser(userId));
  };
  return (
    <div>
      {!isFollowing && (
        <Button color="primary" variant="contained" size="small" onClick={handleFollow}>
          Follow
        </Button>
      )}
      {isFollowing && (
        <GhostButton size="small" onClick={handleUnfollow}>
          Unfollow
        </GhostButton>
      )}
    </div>
  );
};

export default FollowButton;
