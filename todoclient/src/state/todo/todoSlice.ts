import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ITodo } from '../../App'
import axios from 'axios'

// Define a type for the slice state
interface TodoState {
	todos: ITodo[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

// Define the initial state using that type
const initialState: TodoState = {
	todos: [],
	status: 'idle',
	error: null,
}

// Create an async thunk for fetching todos with explicit typing
export const fetchTodos = createAsyncThunk<
	ITodo[],
	void,
	{ rejectValue: string }
>('todos/fetchTodos', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get('https://localhost:7063/api/todo')
		return response.data as ITodo[]
	} catch (error) {
		return rejectWithValue('Failed to fetch todos')
	}
})

export const todoSlice = createSlice({
	name: 'TodoSlice',
	initialState,
	reducers: {
		updateTodos: (state, action: PayloadAction<ITodo[]>) => {
			state.todos = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchTodos.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.todos = action.payload
			})
			.addCase(fetchTodos.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload || 'Something went wrong'
			})
	},
})

export const { updateTodos } = todoSlice.actions

export default todoSlice.reducer
