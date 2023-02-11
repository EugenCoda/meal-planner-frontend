import { Grid, Button, LinearProgress, MenuItem } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
// Unique ID Generator
import { v4 as uuidv4 } from "uuid";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

import units from "../../data/shoppingItemUnits";
import categories from "../../data/shoppingItemCategories";

const AddItem = () => {
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          quantity: "",
          sizeOrUnit: "",
          category: "",
          isCompleted: false,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          return errors;
        }}
        onSubmit={async (
          values,
          { setSubmitting, setErrors, setStatus, resetForm }
        ) => {
          try {
            setSubmitting(false);
            // Adding item ID and date added
            let idAndDate = { id: uuidv4(), timeStamp: serverTimestamp() };
            const newValues = { ...values, ...idAndDate };

            // Saving to Firestore
            const docRef = await addDoc(
              collection(db, "shoppingList"),
              newValues
            );
            console.log("Document written with ID: ", docRef.id);

            resetForm();
            setStatus({ success: true });
          } catch (error) {
            setStatus({ success: false });
            setSubmitting(false);
            setErrors({ submit: error.message });

            // Error saving to Firestore
            console.error("Error adding document: ", error);
          }
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Grid container spacing={1}>
              <Grid item style={{ padding: "20px 5px" }}>
                <Field
                  component={TextField}
                  name="name"
                  type="text"
                  label="Add Item"
                />
              </Grid>
              <Grid item style={{ padding: "20px 5px" }}>
                <Field
                  component={TextField}
                  type="text"
                  label="Quantity"
                  name="quantity"
                />
              </Grid>

              <Grid item>
                <Field
                  component={TextField}
                  type="text"
                  name="sizeOrUnit"
                  label="Size/Unit"
                  select
                  variant="standard"
                  margin="normal"
                  style={{ minWidth: "176px" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {units.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item>
                <Field
                  component={TextField}
                  type="text"
                  name="category"
                  label="Category"
                  select
                  variant="standard"
                  margin="normal"
                  style={{ minWidth: "176px" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              {isSubmitting && <LinearProgress />}

              <Grid item style={{ padding: "30px 10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddItem;
