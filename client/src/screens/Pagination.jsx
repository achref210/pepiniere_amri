import React from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";

import { Link } from "react-router-dom";
import useStyles from "./styles";

const Paginate = (props) => {
  const classes = useStyles();
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={5}
      page={1}
      variant="outlined"
      color="secondary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/${props.screen}?page=${1}`}
        />
      )}
    />
  );
};

export default Paginate;
