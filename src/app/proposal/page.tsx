"use client";

import  { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Bot, Paperclip, ImageIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    role: "bot",
    content: "Hi there! I'm here to help you draft your proposal. Who are we writing this proposal for?",
  },
  {
    id: "2",
    role: "user",
    content: "We're writing it for Acme Corp.",
  },
  {
    id: "3",
    role: "bot",
    content: "Great. What's the main objective or project description? Also, feel free to attach their logo if you have a paid plan, and I'll include it in the exported document.",
  },
];

export default function ProposalCreateChat() {
  const [messages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-black font-sans text-zinc-900 dark:text-zinc-50 selection:bg-zinc-200 dark:selection:bg-zinc-800">
      
      {/* Header */}
      <header className="flex-none flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
            <Link href="/">
              <ArrowLeft className="size-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Drafting Proposal</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">AI Assistant</p>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-8 pb-20">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div
                className={`shrink-0 size-8 rounded-full flex items-center justify-center border ${
                  message.role === "user"
                    ? "bg-zinc-900 text-zinc-50 border-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 dark:border-zinc-50"
                    : "bg-white text-zinc-600 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 shadow-sm"
                }`}
              >
                {message.role === "user" ? (
                  <User className="size-4" />
                ) : (
                  <Bot className="size-4" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm sm:text-base leading-relaxed ${
                  message.role === "user"
                    ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                    : "bg-white border border-zinc-200 text-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 shadow-sm"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="flex-none p-4 sm:p-6 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
        <div className="max-w-3xl mx-auto relative flex items-end gap-2">
          
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full pr-24 pl-4 pt-3 pb-3 h-auto min-h-[52px] rounded-xl border-zinc-300 dark:border-zinc-700 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 shadow-sm transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  // No-op for visual structure right now
                }
              }}
            />
            {/* Visual Attachment Tools */}
            <div className="absolute right-2 bottom-1.5 flex items-center gap-1">
              <div className="relative group/tooltip">
                 <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-lg size-8 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <ImageIcon className="size-4" />
                  <span className="sr-only">Attach Logo (Pro)</span>
                </Button>
                {/* Tooltip purely CSS */}
                <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 w-max px-2 py-1 text-[10px] font-medium text-white bg-zinc-800 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none dark:bg-zinc-200 dark:text-zinc-900">
                  Attach Logo (Pro)
                </div>
              </div>

               <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-lg size-8 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Paperclip className="size-4" />
                  <span className="sr-only">Attach File</span>
                </Button>
            </div>
          </div>

          {/* Send Button */}
          <Button
            type="submit"
            size="icon"
            className="size-[52px] rounded-xl shrink-0 bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all shadow-sm"
          >
            <Send className="size-5" />
            <span className="sr-only">Send message</span>
          </Button>

        </div>
        <div className="max-w-3xl mx-auto text-center mt-3">
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Drafton AI can make mistakes. Consider verifying important financial amounts or terms.
          </p>
        </div>
      </footer>
    </div>
  );
}
