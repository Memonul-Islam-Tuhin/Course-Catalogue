"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "@/store/slices/authSlice";
import { showToast } from "@/store/slices/uiSlice";
import { confetti } from "@/lib/confetti";

export default function AuthForm({ mode }) {
  const reg = mode === "register";
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, ready, status } = useSelector((s) => s.auth);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && user) router.replace("/dashboard");
  }, [ready, user, router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const d = Object.fromEntries(new FormData(e.currentTarget));
    const email = d.email.trim().toLowerCase();

    if (d.password.length < 6) return setError("Password must be at least 6 characters.");
    if (reg && d.password !== d.confirm) return setError("Passwords do not match.");

    const action = reg
      ? registerUser({ username: d.username.trim(), email, password: d.password })
      : loginUser({ identifier: email, password: d.password });

    const res = await dispatch(action);
    if (res.error) return setError(res.payload || "Something went wrong.");

    dispatch(showToast(reg ? "Account created 🎉" : `Welcome back, ${res.payload.user.username}`));
    if (reg) confetti();
    router.push("/dashboard");
  };

  return (
    <div className="fade mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
      <h1 className="text-2xl font-bold tracking-tight">{reg ? "Create your account" : "Welcome back"}</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{reg ? "Join to start learning." : "Log in to continue."}</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {reg && <input className="inp" name="username" placeholder="Username" required />}
        <input className="inp" name="email" type="email" placeholder="Email" required />
        <input className="inp" name="password" type="password" placeholder="Password (min 6 characters)" required />
        {reg && <input className="inp" name="confirm" type="password" placeholder="Confirm password" required />}
        {error && <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}
        <button
          disabled={status === "loading"}
          className="w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
        >
          {status === "loading" ? "Please wait..." : reg ? "Register" : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        {reg ? "Already have an account? " : "New here? "}
        <Link className="font-medium text-indigo-600 hover:underline" href={reg ? "/login" : "/register"}>
          {reg ? "Login" : "Create account"}
        </Link>
      </p>
    </div>
  );
}
