import React, { useMemo, useRef, useState } from "react";
import {
  Bot,
  Send,
  Paperclip,
  Mic,
  Search,
  MoreVertical,
  ShieldCheck,
  GraduationCap,
  Users,
  CalendarDays,
  ClipboardCheck,
  Bell,
  Sparkles,
  Menu,
  X,
  CheckCircle2,
  Clock3,
  UserRound,
} from "lucide-react";

const conversations = [
  {
    id: 1,
    title: "Attendance Help",
    subtitle: "Student attendance summary",
    time: "10:42 AM",
    active: true,
    icon: ClipboardCheck,
  },
  {
    id: 2,
    title: "Teacher Schedule",
    subtitle: "Today lecture plan",
    time: "09:30 AM",
    active: false,
    icon: CalendarDays,
  },
  {
    id: 3,
    title: "Parent Notification",
    subtitle: "WhatsApp absent alert",
    time: "Yesterday",
    active: false,
    icon: Bell,
  },
  {
    id: 4,
    title: "Student Query",
    subtitle: "Fee and exam details",
    time: "Mon",
    active: false,
    icon: GraduationCap,
  },
];

const initialMessages = [
  {
    id: 1,
    type: "bot",
    text: "Hello Prashant! I am your School ERP assistant. I can help with attendance, teacher schedules, student records, fee status, absent alerts, and dashboard reports.",
    time: "10:40 AM",
  },
  {
    id: 2,
    type: "user",
    text: "Show me today absent students from Class 8-A.",
    time: "10:41 AM",
  },
  {
    id: 3,
    type: "bot",
    text: "Today, Class 8-A has 4 absent students. You can send WhatsApp alerts to their parents or open the full attendance report.",
    time: "10:42 AM",
    cards: [
      { label: "Absent Students", value: "4" },
      { label: "Present", value: "38" },
      { label: "Attendance", value: "90.4%" },
    ],
  },
];

const quickActions = [
  "Show today attendance",
  "Send absent alerts",
  "Teacher timetable",
  "Pending fee report",
  "Create monthly summary",
];

const stats = [
  { label: "Students", value: "1,248", icon: GraduationCap },
  { label: "Teachers", value: "84", icon: Users },
  { label: "Today Present", value: "92%", icon: CheckCircle2 },
];

function ChatMessage({ message }) {
  const isUser = message.type === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
          <Bot size={18} />
        </div>
      )}

      <div className={`max-w-[82%] sm:max-w-[70%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
            isUser
              ? "rounded-br-md bg-indigo-600 text-white"
              : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
          }`}
        >
          {message.text}
        </div>

        {message.cards && (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {message.cards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-xs font-medium text-slate-500">{card.label}</p>
                <p className="mt-1 text-xl font-bold text-slate-900">{card.value}</p>
              </div>
            ))}
          </div>
        )}

        <p className={`mt-1 px-1 text-xs text-slate-400 ${isUser ? "text-right" : "text-left"}`}>
          {message.time}
        </p>
      </div>

      {isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
          <UserRound size={18} />
        </div>
      )}
    </div>
  );
}

function Sidebar({ open, onClose }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-80 transform border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
              <Bot size={22} />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900">School ERP Bot</h1>
              <p className="text-xs text-slate-500">AI assistant dashboard</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5">
            <Search size={17} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto px-3 pb-4">
          {conversations.map((chat) => {
            const Icon = chat.icon;
            return (
              <button
                key={chat.id}
                className={`w-full rounded-2xl p-3 text-left transition ${
                  chat.active ? "bg-indigo-50 ring-1 ring-indigo-100" : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                      chat.active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-slate-900">{chat.title}</p>
                      <span className="shrink-0 text-[11px] text-slate-400">{chat.time}</span>
                    </div>
                    <p className="truncate text-xs text-slate-500">{chat.subtitle}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="border-t border-slate-200 p-4">
          <div className="rounded-3xl bg-slate-900 p-4 text-white">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-300" />
              <p className="text-sm font-semibold">Secure ERP Assistant</p>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-300">
              Connect attendance, timetable, student data and notifications with your backend APIs.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function SchoolErpChatbotPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, []);

  const handleSend = () => {
    const value = input.trim();
    if (!value) return;

    const newMessage = {
      id: Date.now(),
      type: "user",
      text: value,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "bot",
          text: "I have received your request. Connect this UI with your chatbot API to return real School ERP data from FastAPI, Node.js, or any backend service.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 600);
  };

  const handleQuickAction = (text) => {
    setInput(text);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {sidebarOpen && (
        <button
          aria-label="Close sidebar overlay"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <div className="flex min-h-screen">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-xl sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="rounded-2xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm hover:bg-slate-50 lg:hidden"
                >
                  <Menu size={20} />
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate text-lg font-bold text-slate-900 sm:text-xl">AI Chat Assistant</h2>
                    <span className="hidden rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 sm:inline-flex">
                      Online
                    </span>
                  </div>
                  <p className="truncate text-xs text-slate-500 sm:text-sm">
                    {greeting}, manage your school data faster with AI.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 sm:inline-flex">
                  New Chat
                </button>
                <button className="rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm hover:bg-slate-50">
                  <MoreVertical size={19} />
                </button>
              </div>
            </div>
          </header>

          <section className="grid flex-1 grid-cols-1 gap-4 p-4 sm:p-6 xl:grid-cols-[1fr_340px]">
            <div className="flex min-h-[calc(100vh-120px)] flex-col overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-linear-to-r from-indigo-600 to-slate-900 p-5 text-white sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Sparkles size={18} className="text-yellow-300" />
                      <span className="text-sm font-semibold text-indigo-100">Smart School ERP Assistant</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">Ask anything about your school operations</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
                      Attendance, timetable, absent alerts, fees, exams, staff reports and dashboard insights in one chatbot screen.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-white/10 p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-indigo-600">
                        <Clock3 size={21} />
                      </div>
                      <div>
                        <p className="text-xs text-indigo-100">Avg Response</p>
                        <p className="text-xl font-bold">1.2 sec</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50/70 p-4 sm:p-6">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </div>

              <div className="border-t border-slate-200 bg-white p-4">
                <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      {action}
                    </button>
                  ))}
                </div>

                <div className="flex items-end gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-2 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50">
                  <button className="rounded-2xl p-3 text-slate-500 hover:bg-white hover:text-slate-900">
                    <Paperclip size={20} />
                  </button>

                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    rows={1}
                    placeholder="Ask about attendance, students, teachers, fees..."
                    className="max-h-32 min-h-12 flex-1 resize-none bg-transparent py-3 text-sm leading-6 outline-none placeholder:text-slate-400"
                  />

                  <button className="hidden rounded-2xl p-3 text-slate-500 hover:bg-white hover:text-slate-900 sm:inline-flex">
                    <Mic size={20} />
                  </button>

                  <button
                    onClick={handleSend}
                    className="rounded-2xl bg-indigo-600 p-3 text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    disabled={!input.trim()}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>

            <aside className="hidden space-y-4 xl:block">
              <div className="rounded-4xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-base font-bold text-slate-900">ERP Overview</h3>
                <p className="mt-1 text-sm text-slate-500">Live school performance summary</p>

                <div className="mt-5 space-y-3">
                  {stats.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">
                            <Icon size={20} />
                          </div>
                          <p className="text-sm font-semibold text-slate-600">{item.label}</p>
                        </div>
                        <p className="text-lg font-bold text-slate-900">{item.value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-4xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-base font-bold text-slate-900">Suggested APIs</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="font-semibold text-slate-800">POST /api/chatbot/message</p>
                    <p className="mt-1 text-xs text-slate-500">Send prompt and receive AI response.</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="font-semibold text-slate-800">GET /api/attendance/today</p>
                    <p className="mt-1 text-xs text-slate-500">Fetch real attendance data.</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="font-semibold text-slate-800">POST /api/alerts/whatsapp</p>
                    <p className="mt-1 text-xs text-slate-500">Send absent student alerts.</p>
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
