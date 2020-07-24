import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent,
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
const styles = makeStyles((df) => ({
  noVerticalPadding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  noVerticalMargin: {
    marginTop: 0,
    marginBottom: 0,
  },
  dangerButton: {
    backgroundColor: df.palette.error.main,
    "&:hover": {
      backgroundColor: df.palette.error.dark,
    },
  },
}));

const InstructionsModal = (props) => {
  const { noVerticalPadding, noVerticalMargin, dangerButton } = styles();
  return (
    <Dialog onClose={props.onClose} open={props.open} scroll="paper">
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <List className={noVerticalPadding}>
          {props.instructionsList.map((i, x) => {
            return (
              <ListItem
                key={`instuction-list-item${x}`}
                className={clsx(noVerticalPadding)}
                style={{ flexDirection: "column", alignItems: "unset" }}
              >
                <ListItemText
                  className={noVerticalPadding}
                  primary={i.title}
                  primaryTypographyProps={{
                    variant: "subtitle2",
                    className: "uppercase",
                  }}
                />
                <List className={noVerticalPadding}>
                  {i.instructions.map((st) => {
                    return (
                      <ListItem
                        key={`instruction-list-instance-list-item${x}`}
                        className={clsx(noVerticalPadding, noVerticalMargin)}
                      >
                        <ListItemText
                          className={clsx(noVerticalPadding, noVerticalMargin)}
                          primary={st}
                          primaryTypographyProps={{
                            variant: "caption",
                          }}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </ListItem>
            );
          })}
        </List>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={props.onClose}
            className={clsx(dangerButton, "white-clr")}
          >
            close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default InstructionsModal;
