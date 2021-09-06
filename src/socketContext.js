import socketio from 'socket.io-client'
import { createContext } from 'react'

export const socket = socketio.connect('http://127.0.0.1:4001')
export const SocketContext = createContext()
