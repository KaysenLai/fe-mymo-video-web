import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';

const GhostButton = (props: ButtonProps) => {
  const { children, ...rest } = props;

  return (
    <div className="ghost-btn">
      <Button variant="outlined" {...rest}>
        {children}
      </Button>
    </div>
  );
};

export default GhostButton;
