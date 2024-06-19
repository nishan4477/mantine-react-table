import React from "react";
import registrationImg from "../../assets/registration.jpg";
import {
  Button,
  PasswordInput,
  TextInput,
  Fieldset,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import { useMutation } from "@tanstack/react-query";
import { postRegistration } from "../../api/postApi";
// import { Register as IRegister } from "../../api/postApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserSchema = z
  .object({
    fullName: z.string().min(1, { message: "Fullname is required" }),
    email: z.string().email({ message: "Invalid email" }),
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string(),
    confirmPassword: z.string(),
    avatar: z.instanceof(File).nullable(),
    coverImage: z.instanceof(File).nullish(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type TUser = z.infer<typeof UserSchema>;
const Register = () => {
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      fullName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      avatar: null,
      coverImage: null,
    },
    validate: zodResolver(UserSchema),
  });

  const { mutate, status, error, isError } = useMutation({
    mutationFn: postRegistration,
    onSuccess: (data) => {
      console.log(data);
      toast.success("New user register successful!", {
        position: "top-right",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
    onError: (err) => {
      console.log("error", err);
      // toastError();

      toast.error("Login Failed!", {
        position: "top-right",
      });
    },
  });

  function handleSubmit(values: TUser) {
    if (!values.avatar) {
      form.setFieldError("avatar", "Avatar is required");
      return;
    }
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("avatar", values.avatar);
    if (values.coverImage) {
      formData.append("coverImage", values.coverImage);
    }
    console.log(formData);
    mutate(formData);
  }

  return (
    <section className="login ">
      <div className="flex w-full h-screen ">
        <div className="basis-1/2 w-full min-h-full py-15">
          <h2 className="text-[52px] text-center py-4 ">Register Here</h2>
          <div className="mx-auto w-1/2">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Fieldset
                styles={{
                  legend: {
                    fontWeight: 700,
                  },
                }}
                legend="Personal Information"
              >
                <TextInput
                  label="Full Name"
                  withAsterisk
                  className="pb-4 "
                  placeholder="Enter your FullName"
                  key={form.key("fullName")}
                  {...form.getInputProps("fullName")}
                />
                <TextInput
                  label="Username"
                  withAsterisk
                  className="pb-4 "
                  placeholder="Enter your username"
                  key={form.key("username")}
                  {...form.getInputProps("username")}
                />
                <TextInput
                  label="Email"
                  withAsterisk
                  className="pb-4 "
                  placeholder="Enter your email"
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  label="Password"
                  withAsterisk
                  className="pb-4"
                  placeholder="Enter your password"
                  key={form.key("password")}
                  {...form.getInputProps("password")}
                />
                <PasswordInput
                  withAsterisk
                  label="Confirm Password"
                  className="pb-4"
                  placeholder="Re-enter your password"
                  key={form.key("confirmPassword")}
                  {...form.getInputProps("confirmPassword")}
                />
                <FileInput
                  label="Select your avatar"
                  withAsterisk
                  placeholder="Avatar"
                  className="pb-4"
                  key={form.key("avatar")}
                  {...form.getInputProps("avatar")}
                />

                <FileInput
                  label="Select your cover photo"
                  placeholder="Cover photo"
                  className="pb-4"
                  key={form.key("coverImage")}
                  {...form.getInputProps("coverImage")}
                />
                <Button
                  disabled={status === "pending"}
                  type="submit"
                  variant="filled"
                >
                  {status === "pending" ? "Registering" : "Register Now"}
                </Button>
              </Fieldset>
            </form>
          </div>
        </div>
        <figure className="basis-1/2 w-full h-full overflow-hidden  ">
          <img
            className="brightness-75"
            src={registrationImg}
            alt="loginImage"
          />
        </figure>
      </div>
    </section>
  );
};

export default Register;
