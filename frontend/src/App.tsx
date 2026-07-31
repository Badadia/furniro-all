import Home from "./pages/Home"
import Container from "./components/Container"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <>
      <Toaster/>
      <Container className="bg-[#FFF]"><Header></Header></Container>
      <Home></Home>
      <Container><Footer></Footer></Container>
    </>
  )
}

export default App
