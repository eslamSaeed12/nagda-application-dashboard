import React from "react";
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
const styles = makeStyles((df) => ({
  imgStyle: {
    maxWidth: "30vw",
  },
}));

const Page = (props) => {
  const { imgStyle } = styles();
  const router = useHistory();
  return (
    <Box>
      <Container>
        <Box textAlign="center" py={6}>
          <Typography variant="h4" className="capitalize" color="error">
            {props.header}
          </Typography>
          {props.content ? <Typography color="error">{props.content}</Typography> : null}
        </Box>
        <Box textAlign="center">
          <img
            src={props.img}
            style={props.ImgStyle}
            className={clsx(imgStyle)}
          />
        </Box>
        <Box textAlign="center">
          <Typography variant="h6" className="capitalize">
            return to the home page
          </Typography>
          <br />
          <Button
            variant="contained"
            color="primary"
            className="white-clr"
            onClick={() => router.push("/")}
          >
            home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Page;
