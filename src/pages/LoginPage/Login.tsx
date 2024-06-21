import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "mantine-form-zod-resolver";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { postLogin } from "../../api/postApi";
import loginImg from "../../assets/login.jpg";
import loginSvg from "../../assets/loginImg.svg";
import toast from "react-hot-toast";
import { userUserData } from "../../store/UserStore";

const User = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type User = z.infer<typeof User>;

const Login = () => {
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(User),
  });
  const [, setValue] = useLocalStorage({
    key: "accessToken",
    defaultValue: "",
  });
  const [setUser, setAccessToken] = userUserData((state) => [
    state.setUser,
    state.setAccessToken,
  ]); //this store provide the user information that is currently logged in

  const { mutateAsync, status } = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      setUser(data.data.data.user);
      setAccessToken(data.data.data.accessToken);
      setValue(data.data.data.accessToken);
      navigate("/home");
      toast.success("Login successful!", {
        position: "top-right",
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Login Failed!", {
        position: "top-right",
      });
    },
  });

  function handleSubmit(values: User) {
    mutateAsync(values);
    form.reset();
  }
  return (
    <section className="flex w-full h-screen">
      <figure className="basis-1/2 w-full h-full overflow-hidden relative ">
        <img className="brightness-75" src={loginImg} alt="loginImage" />
        <h1 className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-white text-2xl font-semibold uppercase">
          welcome to login page.
        </h1>
      </figure>
      <div className="basis-1/2 w-full h-full py-20">
        <figure className="max-w-32 max-h-32 mx-auto">
          <img src={loginSvg} alt="svg" />
        </figure>
        <h2 className="text-[52px] text-center py-4 ">Login Here</h2>
        <div className="mx-auto w-1/2">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email"
              className="pb-4 "
              placeholder="Enter your email address"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              className="pb-4"
              placeholder="Enter your password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
            <Button
              disabled={status === "pending"}
              type="submit"
              variant="filled"
            >
              {status === "pending" ? "logging in" : "Login"}
            </Button>
          </form>

          <p className=" text-end  mt-9 text-slate-600 ">
            Haven't you register yet?{" "}
            <span className="text-blue-800">
              <Link to="/register">Click Here</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
