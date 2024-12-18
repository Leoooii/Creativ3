import React, { useState } from "react";
import { Button, Form, Input } from "@nextui-org/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/providers/auth-store-provider";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthForm({ method }: { method: string }) {
  const [action, setAction] = useState<"reset" | "submit" | undefined>(
    undefined,
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAction("submit");
    let data;
    try {
      if (method === "signUp") {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      toast.success("Autentificare reusita!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.log(method, data);
    } catch (err: unknown) {
      console.log(err);
      alert("Ati introdus parola/email gresit");
    } finally {
      router.push("/auth");
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setAction("reset");
    setError("");
  };
  return (
    <>
      {!user ? (
        <Form
          className="w-full max-w-xs flex flex-col gap-4"
          validationBehavior="native"
          onReset={handleReset}
          onSubmit={handleSubmit}
        >
          <div className={"w-full text-center"}>
            <h1>{method.toUpperCase()}</h1>
          </div>
          <Input
            isRequired
            errorMessage="Eroare de email"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Introduceti email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            isRequired
            errorMessage="Introduceti o parola valida"
            label="Parola"
            labelPlacement="outside"
            name="password"
            placeholder="Introduceti parola"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-2">
            <Button color="primary" type="submit">
              Trimite
            </Button>
            <Button type="reset" variant="flat">
              Sterge
            </Button>
          </div>
          <h1 className={"hidden"}>{action}</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Form>
      ) : (
        <div></div> // Asigură-te că user.email este afișat într-un element valid.
      )}
    </>
  );
}
