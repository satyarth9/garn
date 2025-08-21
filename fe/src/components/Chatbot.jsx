import React, {useEffect, useState, useRef} from 'react'
import { SESSION_ID } from '../constants'
import { getContext } from '../api/sessionApi'
import ChatMessage from './ChatMessage'

export default function Chatbot(){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef()

  useEffect(()=>{
    getContext()
        .then(data => {
            const welcome = {
              role:'bot', 
              message:`Hi there! You are on the '${data.screen}' page. Feel free to browse around or ask for help.`}
            setMessages([welcome])
        })
  },[])

  useEffect(() => { 
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight 
    }
    },[messages,typing])

  const send = async () => {
    if(!input.trim()) {
      return
    }
    const session_id = localStorage.getItem(SESSION_ID)
    const userMsg = {role:'user', message:input}
    setMessages(prev=>[...prev,userMsg])
    setInput('')
    setTyping(true)

    try{
        const res = await fetch('http://localhost:8000/chat',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({"session_id" : session_id, message : userMsg.message})})
          const data = await res.json()
          const botMsg = {role:'bot', message: data.reply.content}
          setMessages(prev=>[...prev, botMsg])
    }catch(error){
          setMessages(prev=>[...prev,{role:'bot', message: 'Error contacting backend.'}])
    }finally{
          setTyping(false)
    }
  }

  return (
    <div className="fixed right-[18px] bottom-[18px] w-[360px] max-w-[calc(100vw-36px)] sm:right-2 sm:w-[360px] sm:max-w-[calc(100vw-16px)]">
      <div className="flex justify-end mb-2">
        <button 
          onClick={() => setOpen(s => !s)} 
          className={`px-3 py-2 rounded-lg border border-gray-300 cursor-pointer ${
            open ? 'bg-slate-50' : 'bg-green-300'
          }`}
        >
          {open ? '✖' : '💬'}
        </button>
      </div>
      {open && (
        <div className="flex flex-col h-96 bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-3 border-b border-gray-200 flex items-center gap-2">
            <strong>Chat Assist</strong>
            <div className="flex-1" />
          </div>
          <div className="p-3 flex-1 overflow-auto" ref={bodyRef}>
            {messages.map(
              (msg, idx) => (<ChatMessage key={idx} msg={msg} />))}
            {typing && <div className="italic text-sm text-gray-500">typing...</div>}
          </div>
          <div className="p-3 border-t border-gray-200 flex gap-2">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault(); 
                  send()
                }
              }} 
              className="flex-1 p-2 rounded-lg border border-gray-200" 
              placeholder="Ask me anything!" 
            />
            <button 
              type="button" 
              onClick={send} 
              className="px-3 py-2 rounded-lg bg-blue-600 text-white border-none cursor-pointer"
            >
              Ask
            </button>
          </div>
        </div>
      )}
    </div>
  )
}