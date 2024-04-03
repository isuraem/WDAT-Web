import axios, { AxiosResponse } from 'axios'

const baseUrl: string = 'http://localhost:5000/api'

export const getTodos = async (): Promise<any> => {
  try {
    const response = await axios.get(baseUrl + '/getAllTodos');
    const todosData = response.data.data;
    
    return todosData
  } catch (error: any) {
    throw new Error(error)
  }
}

export const addTodo = async (
  formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todo: Omit<ITodo, '_id'> = {
      name: formData.name,
      description: formData.description,
      status: false,
    }
    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + '/addTodo',
      todo
    )
    return saveTodo
  } catch (error: any) {
    throw new Error(error)
  }
}

export const updateTodo = async (
    todoData: { id: string, description: string}
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const updatedTodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + `/updateTodo`,
      todoData
    )
    return updatedTodo
  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteTodo = async (
    todoData: { id: string }
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.post(
        baseUrl + '/deleteTodo',
        { id: todoData }
    )
    return deletedTodo
  } catch (error: any) {
    throw new Error(error)
  }
}

export const completeTodo = async (
    todoData: { id: string }
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const completeTodo: AxiosResponse<ApiDataType> = await axios.post(
        baseUrl + '/markTodoAsCompleted',
        { id: todoData }
    )
    return completeTodo
  } catch (error: any) {
    throw new Error(error)
  }
}