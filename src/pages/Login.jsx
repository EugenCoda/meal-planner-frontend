import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { Grid, Button, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  loginForm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "relative",
  },
  errorMsg: {
    fontSize: "12px",
    color: "red",
    position: "absolute",
    bottom: "20px",
  },
});

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();
  const { login } = useContext(AuthContext);

  return (
    <div className={classes.loginForm}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          }
          return errors;
        }}
        onSubmit={async (
          values,
          { setSubmitting, setErrors, setStatus, resetForm }
        ) => {
          try {
            setSubmitting(false);
            const userCredential = await signInWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
            resetForm();
            setStatus({ success: true });
            const user = userCredential.user;
            login(user);
            navigate("/");
          } catch (error) {
            setStatus({ success: false });
            setSubmitting(false);
            setErrors({ submit: error.message });
            setError(true);
          }
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Grid container spacing={1}>
              <Grid item>
                <Field
                  component={TextField}
                  type="email"
                  name="email"
                  label="Email"
                />
              </Grid>

              <Grid item>
                <Field
                  component={TextField}
                  type="password"
                  name="password"
                  label="Password"
                />
              </Grid>

              {isSubmitting && <LinearProgress />}

              <Grid item style={{ padding: "30px 10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      {error && (
        <span className={classes.errorMsg}>Wrong email or password!</span>
      )}
    </div>
  );
};

export default Login;
