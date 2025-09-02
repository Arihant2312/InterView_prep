"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form

} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signUp, signIn } from "@/lib/actions/auth.action"
//import { ShineBorder } from "@/registry/magicui/shine-border";
import { Meteors } from "@/components/magicui/meteors";






// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// })

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(2).max(50).optional() : z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    email: z.string().email("Invalid email address"),
  })
}
const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })


  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-up') {
        const { name, email, password } = values;

        // Create user with Firebase Auth
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        // Save extra user data in Firestore (but NOT password)
        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!, // using ! means you're certain name isn't null/undefined
          email,
          password, // add password to match SignUpParams
        });
        if (!result?.success) {
          toast.error(result?.message);
          return;
        }
        // Handle sign-up logic here
        console.log("Sign-up values:", values);
        toast.success("Account created successfully!");
        router.push('/sign-in'); // Redirect to sign-in page after successful sign-up
      }
      else {
        // Handle si
        const { email, password } = values;
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredentials.user.getIdToken();
        if (!idToken) {
          toast.error("Failed to sign in. Please try again.");
          return;
        }
        await signIn({
          email,
          idToken,
        });
        // console.log("email",email);
        // console.log("password",password);
        // cosnt gn-in logic here
       
        toast.success("Signed in successfully!");
        router.push('/'); // Redirect to home page after successful sign-in

      }
    

    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form. Please try again.");
    }

  }
  const isSignin = type === "sign-in"
  //const isSignup = type === "signup"
  return (
    
    <div className="card-border lg:min-w-[566px]"> <Form {...form}>
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-rowgap-2 justify-center">
          <Image src="/mainicon.png" alt="logo" height={50} width={50} gap-2 />
          <h2 className="text-primary-100">Prep.io</h2>
        </div>
        <h2>Practice Job Interviews with AI</h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full mt-3 form space-y-8">
          {!isSignin && <FormField
            control={form.control}
            name="name"
            label="Name"
            placeholder="Enter your name"
            type="text" />}
          <FormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your Email"
            type="text" />
          <FormField
            control={form.control}
            name="password"
            label="Password"

            placeholder="Enter your password"
            type="password" />

          <Button className="btn" type="submit">{isSignin ? 'Sign-In' : 'Create an Account'}</Button>
        </form>
        <p className="text-center text-xl">
  {isSignin ? "No account yet?" : "Have an account already?"}
  <Link
    href={isSignin ? "/sign-up" : "/sign-in"}
    className="ml-1 font-semibold text-blue-600 hover:text-blue-800 underline"
  >
    {isSignin ? "Sign up" : "Sign in"}
  </Link>
</p>

      </div>

    </Form>
     

    </div>


  )
}

export default AuthForm