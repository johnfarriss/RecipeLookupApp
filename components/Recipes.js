import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/Recipe";
import { Grid,Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import RecipeCreate from "./RecipeCreate";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";


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

const Recipes = ({classes,...props}) => {
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        props.fetchAllRecipes()
    }, []);

    //toast msg
    const { addToast } = useToasts();

    const onDelete = id => {
        if(window.confirm('Delete?'))
            props.deleteRecipe(id, () => addToast("Deleted Successfully.", { appearance: 'info' }));
    }

    return (
        <Paper className = {classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <RecipeCreate {...({currentId, setCurrentId})}/>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>
                                        Name
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.RecipeList.map((record, index) => {
                                        return (
                                            <TableRow key={index} hover>
                                                <TableCell>{record.name}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup variant="text">
                                                        <Button><EditIcon color="primary" 
                                                        onClick={() => {setCurrentId(record.id)}} /></Button>
                                                        <Button><DeleteIcon color="secondary" 
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    RecipeList: state.Recipe.list
});

const mapActionToProps = {
    fetchAllRecipes: actions.fetchAll,
    deleteRecipe: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Recipes));