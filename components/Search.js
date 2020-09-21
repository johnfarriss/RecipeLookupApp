import React, { useEffect } from "react";
import {Paper, withStyles, TextField, Grid, Table, TableBody, TableRow, TableCell} from "@material-ui/core";
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
})

const Search = ({classes, ...props}) => {

    useEffect(() => {
        props.searchRecipes("");
    }, []);

    const handleChange = e => {
        props.searchRecipes(e.target.value);
    }

    return (
        <Paper className = {classes.paper} elevation={3}>
            <TextField
                name="search"
                variant="outlined"
                fullWidth={true}
                label="Search for a Recipe..."
                onChange={e => handleChange(e)} />
            <Grid container>
                <Table>
                    <TableBody>
                        {
                            props.RecipeList.map((record, index) => {
                                return(
                                    <TableRow key={index}>
                                        <TableCell>{record.name}</TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    RecipeList: state.Recipe.searchList
});

const mapActionToProps = {
    searchRecipes: actions.search,
    fetchAllRecipes: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Search));