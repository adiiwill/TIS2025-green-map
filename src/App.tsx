import {useState} from 'react'
import './App.css'

interface Todo {
    id: number,
    content: string,
    done: boolean
}

function App() {
    /* --- VARIABLES --- */

    const [todos, setTodos] = useState<Todo[]>([])
    const [inputValue, setInputValue] = useState('')

    /* --- HELPERS --- */

    function handleAddTodo(content: string) {
        setTodos(prev => {
            return [...prev, {
                id: Date.now(),
                content: content,
                done: false
            }];
        })
    }

    function handleRemoveTodo(idToRemove: number) {
        setTodos(prev => prev.filter(todo => todo.id !== idToRemove))
    }

    function handleCompleted(idToComplete: number) {
        setTodos(prev => {
                return prev.map(todo => {
                        return todo.id === idToComplete ? {...todo, done: !todo.done} : todo;
                    }
                );
            }
        )
    }

    /* --- MAIN --- */

    return (
        <>
            <div className="top">
                <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}/>

                <button onClick={() => {
                    if (inputValue.trim() !== '') {
                        handleAddTodo(inputValue)
                        setInputValue('')
                    }
                }}>Add</button>
            </div>

            <div className="bottom">
                {
                    todos.map((todo: Todo) => (
                        <div key={todo.id}>
                            <input type="checkbox" checked={todo.done} onChange={() => handleCompleted(todo.id)}/>
                            {todo.content}

                            <button onClick={() => handleRemoveTodo(todo.id)}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default App
