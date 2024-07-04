import React, { useState } from 'react'
import { fetchTodos } from '../state/todo/todoSlice'
import { useAppDispatch } from '../state/hooks'

const TodoForm = () => {
	const [input, setInput] = useState<string>('')
	const [serverError, setServerError] = useState<string>('')
	const dispatch = useAppDispatch()
	const HandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value)
	}

	const CreateTodo = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}todo`, {
				method: 'POST',
				body: JSON.stringify({
					Title: input,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (!res.ok) {
				const errorData = await res.json()
				console.log(errorData.Message)
				setServerError(errorData.Message)
				throw new Error('Failed to create todo')
			}
			// Optionally, reset the input or handle success
			setInput('')
			dispatch(fetchTodos())
			// Optionally, handle the response
			const data = await res.json()
			console.log('Created Todo:', data)
		} catch (error) {
			console.error('Error creating todo:', error)
		}
	}

	return (
		<form onSubmit={CreateTodo} className='flex flex-col gap-2'>
			<div className='text-red-600'>
				{serverError !== '' ? 'Error: ' + serverError + '!' : ''}
			</div>
			<div className='flex'>
				<input
					onChange={HandleInput}
					value={input}
					className='bg-slate-200 h-[30px]'
					type='text'
				/>
				<button className='items-center justify-center p-1 px-3 font-bold text-white bg-green-500'>
					Submit
				</button>
			</div>
		</form>
	)
}

export default TodoForm
