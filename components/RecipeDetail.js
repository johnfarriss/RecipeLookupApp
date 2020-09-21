import React from "react";
import {Paper, withStyles} from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "../actions/Recipe";

const styles = theme => ({
    root: {
        "& .MuiTableCell-head":{
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
});

const RecipeDetail = ({classes, ...props}) => {
    return (
        <Paper className={classes.Paper} elevation={3}>

        </Paper>
    );
}

export default connect()(withStyles(styles)(RecipeDetail));
