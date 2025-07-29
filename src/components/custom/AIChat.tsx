// "use client";

// import { useState } from "react";

// export function AIChat() {
//   const [input, setInput] = useState("");
//   const [chatLog, setChatLog] = useState<{role: string; content: string}[]>([]);
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     setChatLog([...chatLog, userMessage]);
//     setInput("");
//     setLoading(true);

//     // Build prompt for AI including real stock data (normally fetched separately)
//     const detailedPrompt = 
// `You are a financial assistant specialized in German and European stocks. 
// Answer the user's question with detailed, beginner-friendly explanations including metrics such as P/E ratio, dividend yield, historical price trends, and a simple forecast of expected returns in 3-5 years.

// User's question: "${input}"

// Provide a clear, jargon-free, and actionable response.`;

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: detailedPrompt }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "AI response failed");

//       const aiMessage = { role: "assistant", content: data.reply };
//       setChatLog((prev) => [...prev, aiMessage]);
//     } catch (e: any) {
//       setChatLog((prev) => [...prev, { role: "assistant", content: "Sorry, could not get a response." }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col space-y-4 p-4 border rounded-lg max-w-md bg-white shadow">
//       <div className="h-64 overflow-y-auto p-2 border rounded bg-gray-50 space-y-2">
//         {chatLog.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-2 rounded ${msg.role === "user" ? "bg-blue-200 text-blue-900" : "bg-gray-200 text-gray-800"}`}
//           >
//             <strong>{msg.role === "user" ? "You" : "FinanceAI"}:</strong> {msg.content}
//           </div>
//         ))}
//         {loading && <p className="italic text-gray-600">FinanceAI is thinking...</p>}
//       </div>

//       <div className="flex gap-2">
//         <input
//           type="text"
//           className="flex-grow border rounded px-3 py-2"
//           placeholder="Ask about a German or European stock or ETF..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           onClick={sendMessage}
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
