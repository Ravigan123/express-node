import React, { useState, useEffect } from "react"

function AuthForm() {
	const section = document.querySelector("section")
	const container = document.querySelector(".container")
	const spans = [...document.querySelectorAll(".form-box .top span")]
	const [name, setName] = useState("")
	const [active, setActive] = useState(false)

	const togleForm = (e) => {
		setActive(!active)
		const color = e.target.dataset.id
		document.querySelector(":root").style.setProperty("--custom", color)
	}

	const handleName = (event) => {
		setName(event.target.value)
		console.log(container)
		// if (!!errors[name])
		// 	setErrors({
		// 		...errors,
		// 		[name]: null,
		// 	});
	}

	return (
		<section className={active ? "active" : null}>
			<div className={active ? "container active" : "container"}>
				<div className='user login'>
					<div className='img-box'>
						<img src='register.jpg' alt='cos' />
					</div>
					<div className='form-box'>
						<div className='top'>
							<p>
								Nie masz konta?
								<span data-id='#ff0066' onClick={togleForm}>
									Zarejestruj się
								</span>
							</p>
						</div>
						<form action=''>
							<div className='form-control'>
								<h2>Logowanie</h2>
								<input
									type='text'
									placeholder='Enter Username'
									onChange={handleName}
								/>
								<div>
									<input
										type='password'
										placeholder='Password'
										// onChange={handleName}
									/>
									<div className='icon form-icon'></div>
								</div>
								<span>Recovery Password</span>
								<input type='Submit' value='Login' />
							</div>
						</form>
					</div>
				</div>

				<div className='user signup'>
					<div className='form-box'>
						<div className='top'>
							<p>
								Masz już konto?
								<span data-id='#1a1aff' onClick={togleForm}>
									Zaloguj się
								</span>
							</p>
						</div>
						<form action=''>
							<div className='form-control'>
								<h2>Rejestracja</h2>
								<input type='email' placeholder='Enter Email' />
								<div>
									<input type='password' placeholder='Password' />
									<div className='icon form-icon'>
										<img src='./images/eye.svg' alt='' />
									</div>
								</div>
								<div>
									<input type='password' placeholder='Confirm Password' />
									<div className='icon form-icon'>
										<img src='./images/eye.svg' alt='' />
									</div>
								</div>
								<input type='Submit' value='Register' />
							</div>
						</form>
					</div>
					<div className='img-box'>
						<img src='login.jpg' alt='' />
					</div>
				</div>
			</div>
		</section>
	)
}

export default AuthForm
