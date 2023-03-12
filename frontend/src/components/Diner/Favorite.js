import React from 'react';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { Icon } from '@mui/material';
import { Button } from 'react-bootstrap';

const FavoriteButton = (props) => {
  return (
    <Button className="col-2 mb-2" size="lg" onClick={props.handleClick} >
      <Icon size="large" component={props.favorite ? StarIcon : StarBorderIcon} />
    </Button>
  );
}

export default FavoriteButton;