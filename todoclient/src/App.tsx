import { useEffect } from 'react'
import TodoItem from './components/TodoItem'
import TodoForm from './components/TodoForm'
import { useAppDispatch, useAppSelector } from './state/hooks'
import { fetchTodos } from './state/todo/todoSlice'

export interface ITodo {
	title: string
	isCompleted: boolean
	id: string
}

const App = () => {
	const { todos, status, error } = useAppSelector(state => state.todo)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchTodos())
	}, [dispatch])

	return (
		<div className='flex justify-center items-center w-screen h-screen bg-slate-500'>
			<div className='w-[90vw] h-[60vh] md:w-[500px] md:h-[500px] overflow-hidden flex flex-col p-[10px] md:p-[40px] rounded-2xl shadow-2xl items-center bg-slate-50'>
				<h2 className='text-[40px] font-bold text-center'>Your todos</h2>
				<TodoForm />
				<div className='mt-[50px] overflow-y-scroll w-full'>
					{todos.length != 0 ? (
						<div className='flex flex-col gap-2'>
							{todos.map(todo => {
								console.log(todo)
								return <TodoItem Todo={todo} />
							})}
							<div></div>
						</div>
					) : (
						<div className='text-center text-[30px]'>
							there are no todos((
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default App
