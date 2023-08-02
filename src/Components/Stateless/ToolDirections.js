import React from "react";
import { Typography, List, ListItem } from "@material-ui/core";

const ToolDirections = () => (
  <List>
    <ListItem>
      <Typography variant="body2" gutterBottom>
        {
          "1.) To find out what you could be saving, enter your Average Monthly Power Bill. "
        }
      </Typography>
    </ListItem>
    <ListItem>
      <Typography variant="body2" gutterBottom>
        {" 2.) Find your home by typing in your Address."}
      </Typography>
    </ListItem>
    <ListItem>
      <Typography variant="body2" gutterBottom>
        {"3.) Click on the four corners of your roof surface and hit  "}
        <strong> Let's Get Started</strong>.
      </Typography>
    </ListItem>
  </List>
);

export default ToolDirections;
