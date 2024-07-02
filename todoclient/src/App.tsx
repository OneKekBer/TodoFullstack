import { useEffect, useState } from 'react'
import TodoItem from './components/TodoItem'
import axios from 'axios'

export interface ITodo {
	Title: string
	IsCompleted: boolean
	Id: string
}

const App = () => {
	const [todos, setTodos] = useState<ITodo[]>([])

	useEffect(() => {
		GetAllTodos()
	}, [])

	const GetAllTodos = async () => {
		console.log('getting todos')
		const res = await axios.get(`https://localhost:7063/api/todo`)
		if (res.status != 200) {
			throw new Error('Failed to fetch todos')
		}

		const data = await res.data.json()
		setTodos(data)
	}

	return (
		<div className='flex w-screen h-screen'>
			<div></div>
			{todos.length != 0 ? (
				<div>
					{todos.map(todo => {
						return <TodoItem Todo={todo} />
					})}
					<div></div>
				</div>
			) : (
				<div>there are no todos((</div>
			)}
		</div>
	)
}

export default App
