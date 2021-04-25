import React from "react";


// MUI Stuff
import Typography from "@material-ui/core/Typography";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Akshay Kulkarni | Datis&nbsp;
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
