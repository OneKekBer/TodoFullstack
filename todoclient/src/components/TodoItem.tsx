import { ITodo } from '../App'
import { useAppDispatch } from '../state/hooks'
import { fetchTodos } from '../state/todo/todoSlice'

const TodoItem = ({ Todo }: { Todo: ITodo }) => {
	const dispatch = useAppDispatch()
	const { title, isCompleted, id } = Todo

	// Function to toggle the completion state of a todo
	const ToggleTodo = async (id: string) => {
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}todo/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (!res.ok) {
				throw new Error('Failed to toggle todo')
			}
			dispatch(fetchTodos())
		} catch (error) {
			console.error('Error toggling todo:', error)
		}
	}

	const DeleteTodo = async (id: string) => {
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}todo/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (!res.ok) {
				throw new Error('Failed to toggle todo')
			}
			dispatch(fetchTodos())
			// Handle success if needed
		} catch (error) {
			console.error('Error toggling todo:', error)
		}
	}

	return (
		<div className='w-full p-2  bg-slate-100' key={id}>
			<div className='flex flex-col items-center justify-between w-full md:flex-row '>
				<div
					className={`text-black mb-1 font-semibold ${
						isCompleted ? 'line-through' : ''
					}`}
				>
					{title}
				</div>
				<div className='flex gap-3'>
					{isCompleted ? (
						<button
							className='items-center justify-center p-1 px-3 font-bold text-white bg-red-200'
							onClick={() => ToggleTodo(id)}
						>
							Undo
						</button>
					) : (
						<button
							className='items-center justify-center p-1 px-3 font-bold text-white bg-green-500'
							onClick={() => ToggleTodo(id)}
						>
							Done
						</button>
					)}

					<button
						className='items-center justify-center p-1 px-3 font-bold text-white bg-red-500'
						onClick={() => DeleteTodo(id)}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	)
}

export default TodoItem
