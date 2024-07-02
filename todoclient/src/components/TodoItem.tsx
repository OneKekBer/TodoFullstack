import { ITodo } from '../App'

// const ToggleTodo = (Id: string) => {
// 	const res = fetch(import.meta.env.VITE_API_URL, {
//    })
// }

const TodoItem = ({ Todo }: { Todo: ITodo }) => {
	const { Title, IsCompleted } = Todo
	return (
		<div>
			<div className={`${IsCompleted ? 'line-through' : ''}`}>{Title}</div>
			{/* <div onClick={ToggleTodo(Id)}>Toggle</div> */}
		</div>
	)
}

export default TodoItem
