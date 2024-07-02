import axios from 'axios'
import { useAppDispatch } from '../state/hooks'
import { UpdateTodos } from '../state/todo/todoSlice'

export const GetAllTodos = async () => {
	const dispatch = useAppDispatch()

	console.log('getting todos')
	try {
		const res = await axios.get(`https://localhost:7063/api/todo`)
		dispatch(UpdateTodos(res.data))
	} catch (error) {
		console.error('Failed to fetch todos:', error)
	}
}
