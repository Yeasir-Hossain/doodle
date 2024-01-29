import Modal from "./components/shared/modal/Modal"
import Toast from "./components/shared/toast/Toast"
import Routing from "./features/routes/Routing"

function App() {

  return (
    <main className="container">
      <Routing />
      <Modal />
      <Toast />
    </main>
  )
}

export default App
