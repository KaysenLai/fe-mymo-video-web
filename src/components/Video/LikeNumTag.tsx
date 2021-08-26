import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import heartIcon from '../../assets/img/heart.svg';

interface ILikeNumTag {
  likeNum: number;
  className?: string;
}

const useStyles = makeStyles(() => ({
  root: {
    padding: '0 12px',
    height: '24px',
    background: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: ' blur(10px)',
    borderRadius: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: {
    width: '14px',
    marginRight: '6px',
  },
}));

const LikeNumTag: FunctionComponent<ILikeNumTag> = ({ likeNum, className }) => {
  const classes = useStyles();
  return (
    <div className={`${className} ${classes.root}`}>
      <img className={classes.heart} src={heartIcon} alt="heart icon" />
      <span>{likeNum}</span>
    </div>
  );
};

export default LikeNumTag;
