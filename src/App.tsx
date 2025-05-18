import {useState} from 'react'
import './App.css'

import {Button} from "@heroui/button";
import {Input} from "@heroui/input";
import {Checkbox} from "@heroui/checkbox";

import {motion, AnimatePresence} from "framer-motion";

import { HugeiconsIcon } from '@hugeicons/react'
import {Add01Icon, Delete01Icon, CleanIcon} from "@hugeicons/core-free-icons";

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

    function handleClearCompleted() {
        setTodos(prev => prev.filter(todo => !todo.done))
    }

    /* --- MAIN --- */

    return (
        <>
            <div className="wrapper">
                <div className="todos flex flex-col gap-1">
                    <AnimatePresence>
                        {todos.filter(todo => todo.done).length >= 3 &&
                            <motion.div
                                layout={"position"}
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 500, damping: 50, duration: 0.1 }}
                                className={"flex justify-center"}
                            >
                                <Button
                                    color={"warning"}
                                    variant={"ghost"}
                                    onPress={() => handleClearCompleted()}
                                >
                                    <HugeiconsIcon icon={CleanIcon} /> Clear done
                                </Button>
                            </motion.div>
                        }

                        {todos.map((todo: Todo) => (
                                <motion.div
                                    key={todo.id}
                                    layout={"position"}
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 50, duration: 0.1 }}
                                    className={"w-full flex justify-between"}
                                >
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
                                </motion.div>
                            ))
                        }
                    </AnimatePresence>
                </div>

                <div className="inputs">
                    <AnimatePresence>
                        {isInputVisible && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Input
                                    type="text"
                                    value={inputValue}
                                    placeholder={"Add new todo"}
                                    color={"primary"}
                                    onChange={e => setInputValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (inputValue.trim() !== '' && e.key === "Enter") {
                                            handleAddTodo(inputValue)
                                            setInputValue('')
                                        }
                                    }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Button
                        color={"primary"}
                        isIconOnly
                        radius={"full"}
                        size={"lg"}
                        onPress={() => {setInputVisibility(!isInputVisible)}}
                        style={{
                            transition: "transform 0.3s ease",
                            transform: isInputVisible ? "rotate(45deg)" : "rotate(0deg)"
                        }}
                    >
                        <HugeiconsIcon icon={Add01Icon} />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default App
