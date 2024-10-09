"use client";
import React, { useState } from "react";
import supabase from "../utils/supabase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submit");
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      // TODO: handle error
    }
    if (data?.user) {
      // then we'll need to store the user in local storage or something
      // TODO: store user in local storage

      // then redirect to the home screen
      router.push("/");
    }
  };

  return (
    <div>
      <Card
        className="rounded-lg"
        style={{ width: "30%", margin: "auto", marginTop: "30vh" }}
      >
        <CardContent>
          <Typography
            className="mb-4 mt-4 text-center"
            style={{ color: "gray" }}
            variant="h5"
          >
            Welcome back! Please login or create an account to continue.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              className="w-full mb-4"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              className="w-full mb-4"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              color="primary"
              className="w-full"
              variant="contained"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
