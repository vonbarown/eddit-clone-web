import React, { useState } from "react";
import { Wrapper } from "../components/Wrapper";
import { Formik, Form } from "formik";
import login from "./login";
import { toErrorMap } from "../utils/toErrorMap";
import { InputField } from "../components/InputField";
import { Box, Flex, Link, Button } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrlqClient";
import { useForgotPasswordMutation } from "../generated/graphql";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              Check your email, if you did not receive an email from us check
              your spelling errors.
            </Box>
          ) : (
            <Form>
              <Box mt={4}>
                <InputField
                  name="email"
                  placeholder="email"
                  label="Email"
                  type="email"
                />
              </Box>
              <Button
                type="submit"
                variantColor="teal"
                mt={5}
                isLoading={isSubmitting}
              >
                Send token
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
