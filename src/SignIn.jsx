import pb from "./lib/pocketBase"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"

function SignIn() {
  const { register, handleSubmit } = useForm()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [triggerLoad, setTriggerLoad] = useState(0)
  useEffect(() => {
    if (pb.authStore.isValid) {
      setIsLoggedIn(true)
      setTriggerLoad((num) => num + 1)
    }
  }, [])
  const handleData = async (data) => {
    console.log(data)
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(data.email, data.password)
      setIsLoggedIn(true)
    } catch (error) {
      alert(error)
    }
  }

  if (isLoggedIn && !pb.authStore.model.verified) {
    const handleEmail = async () => {
      await pb.collection("users").requestVerification(pb.authStore.model.email)
    }
    return (
      <>
        <h1>Please Verify Email</h1>
        <p>
          Check your inbox and verify your email: {pb.authStore.model.email}
        </p>
        <button onClick={handleEmail}>Resend Email</button>
      </>
    )
  }

  return (
    <>
      {pb.authStore.isValid && pb.authStore.model.name}
      <form onSubmit={handleSubmit(handleData)}>
        <input type='text' placeholder='email' {...register("email")} />
        <input
          type='password'
          placeholder='password'
          {...register("password")}
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default SignIn
