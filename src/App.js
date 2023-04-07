import pb from "./lib/pocketBase"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

function App() {
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm()

  const handleData = async (data) => {
    try {
      const userData = {
        username: data.name,
        email: data.email,
        emailVisibility: true,
        password: data.password,
        passwordConfirm: data.password,
        name: data.name,
      }

      await pb.collection("users").requestVerification(data.email)
      await navigate("/signin")
    } catch (error) {
      alert(error)
    }
  }
  return (
    <form onSubmit={handleSubmit(handleData)}>
      <input type='name' placeholder='name' {...register("name")} />
      <input type='email' placeholder='email' {...register("email")} />
      <input type='password' placeholder='password' {...register("password")} />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default App
