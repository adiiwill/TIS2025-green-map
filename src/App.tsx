import {useState} from 'react'
import './App.css'

import {Button} from "@heroui/button";
import {Input} from "@heroui/input";
import {Checkbox} from "@heroui/checkbox";

import { HugeiconsIcon } from '@hugeicons/react'
import {Add01Icon, Delete01Icon} from "@hugeicons/core-free-icons";

interface Todo {
    id: number,
    content: string,
    done: boolean
}

function App() {
    /* --- VARIABLES --- */

    const [todos, setTodos] = useState<Todo[]>([])
    const [inputValue, setInputValue] = useState('')

    const [isInputVisible, setInputVisibility] = useState(false);

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
            <div className="wrapper">
                <div className="todos flex flex-col gap-1">
                    {
                        todos.map((todo: Todo) => (
                            <div key={todo.id} className={"w-full flex justify-between"}>
                                <Checkbox
                                    checked={todo.done}
                                    onChange={() => handleCompleted(todo.id)}
                                    lineThrough
                                >
                                    {todo.content}
                                </Checkbox>

                                <Button
                                    color={"danger"}
                                    variant={"light"}
                                    radius={"full"}
                                    isIconOnly
                                    onPress={() => handleRemoveTodo(todo.id)}
                                >
                                    <HugeiconsIcon icon={Delete01Icon} />
                                </Button>
                            </div>
                        ))
                    }
                </div>

                <div className="inputs">
                    {isInputVisible ?
                        <Input
                            type="text"
                            value={inputValue}
                            placeholder={"Add new todo"}
                            onChange={e => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (inputValue.trim() !== '' && e.key === "Enter") {
                                    handleAddTodo(inputValue)
                                    setInputValue('')
                                }
                            }}
                        /> : ""}

                    <Button
                        color="primary"
                        isIconOnly
                        radius={"full"}
                        size={"lg"}
                        onPress={() => {setInputVisibility(!isInputVisible)}}
                    >
                        <HugeiconsIcon icon={Add01Icon} />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default App
