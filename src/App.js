import logo from "./logo.svg"
import "./App.scss"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AuthForm from "./components/Auth/AuthForm"

function App() {
	return (
		<>
			<Router>
				<Routes>
					{/* <Route path='/' element={<Data />} /> */}
					<Route path='/logowanie' element={<AuthForm />} />
					{/* <Route path='/location/create' element={<NewLocation />} />
					<Route path='/device' element={<Device />} />
					<Route path='/device/create' element={<NewDevice />} />
					<Route path='/type' element={<Type />} />
					<Route path='/receiver' element={<Receiver />} />
					<Route path='/receiver/create' element={<NewReceiver />} />
					<Route path='/alert' element={<Alert />} /> */}
				</Routes>
			</Router>
		</>
	)
}

export default App
