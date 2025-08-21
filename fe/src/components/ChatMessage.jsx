const ChatMessage = ({msg}) => {

  return (
    <div className={`my-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
      <div className={`inline-block p-3 rounded-lg max-w-[85%] ${
        msg.role === 'user' 
          ? 'bg-blue-200' 
          : 'bg-gray-100'
      }`}>
        {msg.message}
      </div>
    </div>
  )
}

export default ChatMessage;