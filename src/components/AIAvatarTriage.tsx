import { useState } from 'react';
import { BASE_URL } from '../config';

export default function AIAvatarTriage() {
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const send = async () => {
    if (!input.trim() || isSending) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, {sender: 'user', text: userMsg}]);
    setIsSending(true);

    try {
      const res = await fetch(`${BASE_URL}/api/triage`, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: userMsg})
      });
      const data = await res.json().catch(() => ({}));
      setMessages(prev => [...prev, {sender: 'ai', text: data.response || "Server responded without text."}]);
    } catch (err) {
      setMessages(prev => [...prev, {sender: 'ai', text: "Server is waking up, please retry in a moment."}]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-white/10 h-96 flex flex-col">
      <div className="p-4 border-b border-white/10 font-batman">Clinical AI Assistant</div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => <div key={i} className={m.sender === 'user' ? 'text-right' : 'text-left'}>{m.text}</div>)}
      </div>
      <div className="p-4 border-t border-white/10 flex">
        <input 
          className="flex-1 bg-transparent border-none outline-none px-2 text-white" 
          placeholder="Ask clinical assistant..."
          value={input} 
          disabled={isSending}
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button onClick={send} disabled={isSending} className="text-honey font-bold px-3">
          {isSending ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
