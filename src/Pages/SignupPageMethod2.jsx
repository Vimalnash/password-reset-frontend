import { Formik, Form as FormikForm, Field } from "formik";
import { Button, TextField } from "@mui/material";

const MuiTextField = ({ field, form, ...props }) => {
  return <TextField {...field} {...props} />;
};

const SignupPage = () => {
  return (
    <Formik
      initialValues={{
        name: "test"
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleChange }) => (
        <FormikForm>
          <Field
            component={MuiTextField}
            name="name"
            label="Name"
            fullWidth
          ></Field>

          <Button
            color="success"
            variant="contained"
            type="submit"
            onClick={() => {
              console.log(values);
            }}
          >
            Erstellen
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
};

export {SignupPage };
