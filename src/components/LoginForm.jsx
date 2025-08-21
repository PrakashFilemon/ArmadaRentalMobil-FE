import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { login } from "@/redux/actions/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid" }),
  password: z.string().nonempty({ message: "Password Harus Diisi" }),
});

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Define submit handler.
  function onSubmit(values) {
    const email = values.email;
    const password = values.password;
    dispatch(login(navigate, email, password));
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="font-bold text-xl md:text-2xl">
          Login Akun
        </CardTitle>
        <CardDescription>Selamat Datang</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel className="text-sm font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Masukan Email Anda"
                      className="w-full p-2 text-sm md:text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs italic text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel className="text-sm font-medium">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        placeholder="Masukan Password Anda"
                        type={showPassword ? "text" : "password"}
                        className="w-full p-2 pr-10 text-sm md:text-base"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex="-1"
                      >
                        {!showPassword ? (
                          <Eye className="w-5 h-5 md:w-6 md:h-6" />
                        ) : (
                          <EyeOff className="w-5 h-5 md:w-6 md:h-6" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs italic text-red-500" />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 w-full">
              <Button
                className="w-full sm:w-auto px-4 py-2 text-sm md:text-base"
                type="submit"
              >
                Masuk
              </Button>
              <Link
                to="/register"
                className="w-full sm:w-auto text-center font-sans text-color-primary hover:text-hover-primary font-medium text-sm md:text-base"
              >
                Belum Ada Akun?
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
