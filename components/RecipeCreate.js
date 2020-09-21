import React, {useState, useEffect} from "react";
import { Grid, TextField, withStyles, Button } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/Recipe";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230
        }
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    name: ""
}

const RecipeCreate = ({classes,...props}) => {

    const { addToast } = useToasts()

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if(fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        if(validate()){
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", {appearance: 'success'})
            } 

            if(props.currentId == 0)
                props.createRecipe(values, onSuccess)
            else
                props.updateRecipe(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if(props.currentId != 0){
            setValues({
                ...props.RecipeList.find(x => x.id == props.currentId)
            })
            setErrors({});
        }
    }, [props.currentId])

    return(
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField 
                        name="name"
                        variant="outlined"
                        label="Recipe Name"
                        value={values.name}
                        onChange={handleInputChange}
                        {...(errors.name && {error: true, helperText: errors.name})}

                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                            >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                            >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = state => ({
    RecipeList: state.Recipe.list
})

const mapActionToProps = {
    createRecipe: actions.create,
    updateRecipe: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(RecipeCreate));