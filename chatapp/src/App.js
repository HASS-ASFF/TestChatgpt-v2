import './App.css';
import './normal.css';
import {useState,useEffect} from 'react';

function App() {

  const [input,setInput] = useState("");
  const [chatLog,setChatLog] = useState([]);
  const [chatHistory,setChathistory] = useState([]);
  let isHistory = false;

  useEffect(()=>{
    gethistory();
  },[])

  function gethistory(){
    const response =  fetch("http://localhost:3080/historychat")
    .then(res => res.json())
    .then(data => setChathistory(data.message.map((m)=>["Q: "+m.question+"  ==>  R: "+m.response])))

    console.log(chatHistory);
  }

  async function clearChat(){
    //console.log(chatLog);
    isHistory=false;
    setChatLog([]);
  }

  async function showHistory(){
    setChatLog(chatHistory);
    isHistory = true;
    //console.log(chatLog);
  }

  async function handleSubmit(e){
    e.preventDefault();
    let chatLogNew = [...chatLog, { user:"me",message: `${input}`}];
    setInput("");

    setChatLog(chatLogNew);

    const messages = chatLogNew.map((message) => message.message).join("");
    
    const response = await fetch("http://localhost:3080/",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages
      })
      
    });
      
      const data = await response.json();
      setChatLog([...chatLogNew,{ user: "chatgpt", message: `${data.message}`}]);
      console.log(data.message); 
      console.log(chatLog);
  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
        <div className='historychat side-menu-button' onClick={showHistory}>
          History of chat
        </div>
      </aside>
      <section className="chatbox">
        <div className='chat-log'>

          {chatLog.map((message,index)=>(
            <ChatMessage isHistory={isHistory} key={index} message={message} />
          ))}

          
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
            rows="1" 
            value={input}
            onChange={(e)=> setInput(e.target.value)}
            className='chat-input-text'
            placeholder="Type your message..."></input>
          </form>
          </div>
          
      </section>
    </div>
  );
}


const ChatMessage = ({ message },isHistory) =>{
  return (
    <div className={`chat-message ${message.user}`}>
            <div className='chat-message-center'>
            <div className='message'>
              {isHistory ? message : message.message}
            </div>
            </div>
          </div>
  )
}
export default App;
