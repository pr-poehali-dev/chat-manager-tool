import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "contacts" | "chats" | "groups" | "search" | "profile" | "settings";

const contacts = [
  { id: 1, name: "Алексей Смирнов", status: "online", lastSeen: "сейчас", avatar: "АС", color: "#8B5CF6", mood: "🎮 Играю в игры", phone: "+7 999 123-45-67", mutual: 12 },
  { id: 2, name: "Мария Иванова", status: "online", lastSeen: "сейчас", avatar: "МИ", color: "#22D3EE", mood: "☕ Пью кофе", phone: "+7 912 987-65-43", mutual: 8 },
  { id: 3, name: "Дмитрий Козлов", status: "offline", lastSeen: "1 ч назад", avatar: "ДК", color: "#F472B6", mood: "📚 Читаю", phone: "+7 903 456-78-90", mutual: 5 },
  { id: 4, name: "Екатерина Новикова", status: "online", lastSeen: "сейчас", avatar: "ЕН", color: "#34D399", mood: "🎵 Слушаю музыку", phone: "+7 916 321-65-87", mutual: 15 },
  { id: 5, name: "Андрей Петров", status: "offline", lastSeen: "3 ч назад", avatar: "АП", color: "#FB923C", mood: "💻 Работаю", phone: "+7 926 654-32-10", mutual: 3 },
  { id: 6, name: "Ольга Сидорова", status: "online", lastSeen: "сейчас", avatar: "ОС", color: "#A78BFA", mood: "🌸 Гуляю", phone: "+7 977 789-01-23", mutual: 7 },
];

const chats = [
  { id: 1, name: "Алексей Смирнов", lastMsg: "Окей, договорились на вечер!", time: "14:32", unread: 2, avatar: "АС", color: "#8B5CF6", status: "online" },
  { id: 2, name: "Мария Иванова", lastMsg: "Фотки скинула в облако 📸", time: "12:15", unread: 0, avatar: "МИ", color: "#22D3EE", status: "online" },
  { id: 3, name: "Дмитрий Козлов", lastMsg: "Ха, это смешно 😄", time: "вчера", unread: 5, avatar: "ДК", color: "#F472B6", status: "offline" },
  { id: 4, name: "Екатерина Новикова", lastMsg: "Спасибо большое!", time: "вчера", unread: 0, avatar: "ЕН", color: "#34D399", status: "online" },
  { id: 5, name: "Андрей Петров", lastMsg: "Увидимся в выходные", time: "пн", unread: 1, avatar: "АП", color: "#FB923C", status: "offline" },
];

const messages = [
  { id: 1, from: "other", text: "Привет! Как дела?", time: "14:20" },
  { id: 2, from: "me", text: "Отлично, спасибо! У тебя как?", time: "14:21" },
  { id: 3, from: "other", text: "Тоже всё хорошо 😊 Планируешь что-то на выходные?", time: "14:22" },
  { id: 4, from: "me", text: "Да, думаю поехать за город. А ты?", time: "14:28" },
  { id: 5, from: "other", text: "Окей, договорились на вечер!", time: "14:32" },
];

const groups = [
  { id: 1, name: "Друзья с универа", members: 24, lastMsg: "Встречаемся в пятницу!", avatar: "🎓", color: "#8B5CF6", online: 8 },
  { id: 2, name: "Рабочий чат", members: 12, lastMsg: "Дедлайн перенесли на вторник", avatar: "💼", color: "#22D3EE", online: 5 },
  { id: 3, name: "Спортивная команда", members: 18, lastMsg: "Тренировка в 19:00", avatar: "⚽", color: "#34D399", online: 11 },
  { id: 4, name: "Семейный чат", members: 8, lastMsg: "Мама: Приходите в воскресенье 🍲", avatar: "🏠", color: "#FB923C", online: 3 },
  { id: 5, name: "Путешественники", members: 47, lastMsg: "Новые фото из Японии!", avatar: "✈️", color: "#F472B6", online: 19 },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("contacts");
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageText, setMessageText] = useState("");
  const [isVideoCall, setIsVideoCall] = useState(false);

  const activeChatData = chats.find(c => c.id === activeChat);
  const selectedContactData = contacts.find(c => c.id === selectedContact);

  const navItems: { tab: Tab; icon: string; label: string }[] = [
    { tab: "contacts", icon: "Users", label: "Контакты" },
    { tab: "chats", icon: "MessageCircle", label: "Чаты" },
    { tab: "groups", icon: "UsersRound", label: "Группы" },
    { tab: "search", icon: "Search", label: "Поиск" },
    { tab: "profile", icon: "CircleUser", label: "Профиль" },
    { tab: "settings", icon: "Settings2", label: "Настройки" },
  ];

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen w-screen flex bg-background overflow-hidden">
      {/* Фоновые декоративные пятна */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #22D3EE 0%, transparent 70%)" }} />
        <div className="absolute top-[50%] left-[50%] w-[300px] h-[300px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #F472B6 0%, transparent 70%)", transform: "translate(-50%, -50%)" }} />
      </div>

      {/* Боковая навигация */}
      <nav className="relative z-10 w-20 flex flex-col items-center py-6 gap-2 glass border-r border-white/5">
        <div className="mb-4 w-12 h-12 rounded-2xl flex items-center justify-center neon-glow"
          style={{ background: "linear-gradient(135deg, #8B5CF6, #22D3EE)" }}>
          <span className="text-white font-bold text-lg font-heading">С</span>
        </div>

        {navItems.map(({ tab, icon, label }) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setActiveChat(null); setSelectedContact(null); }}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 relative group ${
              activeTab === tab ? "neon-glow" : "glass-hover opacity-50 hover:opacity-100"
            }`}
            style={activeTab === tab ? { background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(34,211,238,0.3))", border: "1px solid rgba(139,92,246,0.5)" } : {}}
            title={label}
          >
            <Icon name={icon} size={20} className={activeTab === tab ? "text-white" : "text-muted-foreground"} />
            {tab === "chats" && chats.reduce((s, c) => s + c.unread, 0) > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-white font-bold flex items-center justify-center"
                style={{ background: "#8B5CF6", fontSize: "9px" }}>
                {chats.reduce((s, c) => s + c.unread, 0)}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Основной контент */}
      <main className="relative z-10 flex-1 flex overflow-hidden">

        {/* КОНТАКТЫ */}
        {activeTab === "contacts" && (
          <div className="flex flex-1 overflow-hidden">
            <div className={`flex flex-col border-r border-white/5 glass transition-all duration-300 ${selectedContact ? "w-80" : "flex-1"}`}>
              <div className="p-5 pb-3">
                <h1 className="font-heading text-xl font-bold mb-4 text-gradient">Контакты</h1>
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none glass border-white/10 focus:border-purple-500/50 transition-colors"
                    style={{ background: "rgba(255,255,255,0.04)", color: "white" }}
                    placeholder="Поиск контактов..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-3 space-y-1">
                <p className="text-xs text-muted-foreground px-2 py-2 font-medium uppercase tracking-wider">
                  Онлайн — {contacts.filter(c => c.status === "online").length}
                </p>
                {filteredContacts.map((contact, i) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 text-left ${
                      selectedContact === contact.id ? "glass border border-purple-500/30 neon-glow" : "glass-hover"
                    }`}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="relative flex-shrink-0">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-sm ${selectedContact === contact.id ? "avatar-ring" : ""}`}
                        style={{ background: `linear-gradient(135deg, ${contact.color}80, ${contact.color}40)`, border: `1px solid ${contact.color}40` }}>
                        {contact.avatar}
                      </div>
                      {contact.status === "online" && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background online-dot"
                          style={{ background: "#34D399" }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{contact.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{contact.mood}</p>
                    </div>
                    <span className={`text-xs ${contact.status === "online" ? "text-green-400" : "text-muted-foreground"}`}>
                      {contact.status === "online" ? "онлайн" : contact.lastSeen}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {selectedContact && selectedContactData ? (
              <div className="flex-1 flex flex-col items-center justify-start pt-12 px-8 animate-fade-in overflow-y-auto scrollbar-thin">
                <button onClick={() => setSelectedContact(null)} className="self-start mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
                  <Icon name="ArrowLeft" size={16} />
                  Назад
                </button>
                <div className="relative mb-6 animate-float">
                  <div className="w-28 h-28 rounded-3xl flex items-center justify-center text-white text-3xl font-bold avatar-ring"
                    style={{ background: `linear-gradient(135deg, ${selectedContactData.color}, ${selectedContactData.color}80)` }}>
                    {selectedContactData.avatar}
                  </div>
                  {selectedContactData.status === "online" && (
                    <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-background online-dot"
                      style={{ background: "#34D399" }} />
                  )}
                </div>
                <h2 className="font-heading text-2xl font-bold mb-1">{selectedContactData.name}</h2>
                <p className="text-muted-foreground mb-1">{selectedContactData.mood}</p>
                <p className="text-xs text-muted-foreground mb-6">
                  {selectedContactData.status === "online" ? "🟢 Онлайн" : `Был(а) ${selectedContactData.lastSeen}`}
                </p>
                <div className="flex gap-3 mb-8">
                  <button onClick={() => { setActiveTab("chats"); setActiveChat(selectedContactData.id); }}
                    className="flex flex-col items-center gap-2 px-5 py-3 rounded-2xl transition-all hover:scale-105"
                    style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}>
                    <Icon name="MessageCircle" size={20} style={{ color: "#8B5CF6" }} />
                    <span className="text-xs font-medium">Написать</span>
                  </button>
                  <button onClick={() => setIsVideoCall(true)}
                    className="flex flex-col items-center gap-2 px-5 py-3 rounded-2xl transition-all hover:scale-105"
                    style={{ background: "rgba(34,211,238,0.15)", border: "1px solid rgba(34,211,238,0.3)" }}>
                    <Icon name="Video" size={20} style={{ color: "#22D3EE" }} />
                    <span className="text-xs font-medium">Видеозвонок</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 px-5 py-3 rounded-2xl transition-all hover:scale-105"
                    style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)" }}>
                    <Icon name="Phone" size={20} style={{ color: "#34D399" }} />
                    <span className="text-xs font-medium">Позвонить</span>
                  </button>
                </div>
                <div className="w-full max-w-sm space-y-3">
                  <div className="glass p-4 rounded-2xl flex items-center gap-3">
                    <Icon name="Phone" size={16} className="text-muted-foreground" />
                    <span className="text-sm">{selectedContactData.phone}</span>
                  </div>
                  <div className="glass p-4 rounded-2xl flex items-center gap-3">
                    <Icon name="Users" size={16} className="text-muted-foreground" />
                    <span className="text-sm">{selectedContactData.mutual} общих контакта</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div className="text-center opacity-20">
                  <Icon name="UserRound" size={64} className="mx-auto mb-4 text-purple-400" />
                  <p className="text-lg font-medium">Выберите контакт</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ЧАТЫ */}
        {activeTab === "chats" && (
          <div className="flex flex-1 overflow-hidden">
            <div className={`flex flex-col border-r border-white/5 glass transition-all duration-300 ${activeChat ? "w-80" : "flex-1"}`}>
              <div className="p-5 pb-3">
                <h1 className="font-heading text-xl font-bold mb-4 text-gradient">Сообщения</h1>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-3 space-y-1">
                {chats.map((chat, i) => (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChat(chat.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left ${
                      activeChat === chat.id ? "glass border border-purple-500/30 neon-glow" : "glass-hover"
                    }`}
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm"
                        style={{ background: `linear-gradient(135deg, ${chat.color}80, ${chat.color}40)`, border: `1px solid ${chat.color}30` }}>
                        {chat.avatar}
                      </div>
                      {chat.status === "online" && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background online-dot"
                          style={{ background: "#34D399" }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-sm font-semibold truncate">{chat.name}</p>
                        <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground truncate">{chat.lastMsg}</p>
                        {chat.unread > 0 && (
                          <span className="flex-shrink-0 ml-2 w-5 h-5 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ background: "#8B5CF6", fontSize: "10px" }}>
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {activeChat && activeChatData ? (
              <div className="flex-1 flex flex-col animate-fade-in">
                <div className="flex items-center gap-3 p-4 glass border-b border-white/5">
                  <button onClick={() => setActiveChat(null)} className="mr-1 text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="ArrowLeft" size={18} />
                  </button>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: `linear-gradient(135deg, ${activeChatData.color}80, ${activeChatData.color}40)` }}>
                      {activeChatData.avatar}
                    </div>
                    {activeChatData.status === "online" && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background"
                        style={{ background: "#34D399" }} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{activeChatData.name}</p>
                    <p className="text-xs" style={{ color: activeChatData.status === "online" ? "#34D399" : "#6b7280" }}>
                      {activeChatData.status === "online" ? "онлайн" : "не в сети"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setIsVideoCall(true)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center glass-hover transition-all">
                      <Icon name="Video" size={18} style={{ color: "#22D3EE" }} />
                    </button>
                    <button className="w-9 h-9 rounded-xl flex items-center justify-center glass-hover transition-all">
                      <Icon name="Phone" size={18} style={{ color: "#34D399" }} />
                    </button>
                    <button className="w-9 h-9 rounded-xl flex items-center justify-center glass-hover transition-all">
                      <Icon name="MoreVertical" size={18} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
                  {messages.map((msg, i) => (
                    <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"} animate-fade-in`}
                      style={{ animationDelay: `${i * 60}ms` }}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl ${msg.from === "me" ? "rounded-tr-sm text-white" : "glass rounded-tl-sm"}`}
                        style={msg.from === "me" ? { background: "linear-gradient(135deg, #8B5CF6, #6D28D9)" } : {}}>
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.from === "me" ? "text-purple-200" : "text-muted-foreground"}`}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 glass border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <button className="w-9 h-9 rounded-xl flex items-center justify-center glass-hover text-muted-foreground hover:text-foreground">
                      <Icon name="Paperclip" size={18} />
                    </button>
                    <input
                      className="flex-1 px-4 py-2.5 rounded-2xl text-sm outline-none transition-colors"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }}
                      placeholder="Напишите сообщение..."
                      value={messageText}
                      onChange={e => setMessageText(e.target.value)}
                    />
                    <button className="w-9 h-9 rounded-xl flex items-center justify-center glass-hover text-muted-foreground hover:text-foreground">
                      <Icon name="Smile" size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all hover:scale-105 neon-glow"
                      style={{ background: "linear-gradient(135deg, #8B5CF6, #6D28D9)" }}>
                      <Icon name="Send" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div className="text-center opacity-20">
                  <Icon name="MessageCircle" size={64} className="mx-auto mb-4 text-purple-400" />
                  <p className="text-lg font-medium">Выберите чат</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ГРУППЫ */}
        {activeTab === "groups" && (
          <div className="flex-1 p-6 overflow-y-auto scrollbar-thin">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-heading text-2xl font-bold text-gradient">Группы</h1>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:scale-105 neon-glow"
                  style={{ background: "linear-gradient(135deg, #8B5CF6, #6D28D9)" }}>
                  <Icon name="Plus" size={16} />
                  Создать
                </button>
              </div>
              <div className="space-y-3">
                {groups.map((group, i) => (
                  <div key={group.id} className="glass glass-hover p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-all animate-fade-in"
                    style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${group.color}30, ${group.color}10)`, border: `1px solid ${group.color}30` }}>
                      {group.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{group.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ background: `${group.color}20`, color: group.color }}>
                          {group.online} онлайн
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mb-1">{group.lastMsg}</p>
                      <p className="text-xs text-muted-foreground">{group.members} участников</p>
                    </div>
                    <Icon name="ChevronRight" size={18} className="text-muted-foreground flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ПОИСК */}
        {activeTab === "search" && (
          <div className="flex-1 p-6 overflow-y-auto scrollbar-thin">
            <div className="max-w-2xl mx-auto">
              <h1 className="font-heading text-2xl font-bold text-gradient mb-6">Поиск</h1>
              <div className="relative mb-6">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-base outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(139,92,246,0.3)", color: "white", boxShadow: "0 0 20px rgba(139,92,246,0.1)" }}
                  placeholder="Поиск людей, чатов, групп..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              {searchQuery ? (
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Результаты для «{searchQuery}»</p>
                  <div className="space-y-2">
                    {contacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(c => (
                      <div key={c.id} className="glass glass-hover p-3 rounded-2xl flex items-center gap-3 cursor-pointer">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                          style={{ background: `linear-gradient(135deg, ${c.color}80, ${c.color}40)` }}>
                          {c.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.mood}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Недавние</p>
                  <div className="flex flex-wrap gap-2">
                    {contacts.slice(0, 4).map(c => (
                      <button key={c.id} onClick={() => setSearchQuery(c.name)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm glass glass-hover transition-all">
                        <span style={{ color: c.color }}>●</span>
                        {c.name.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                  <div className="mt-12 text-center opacity-20">
                    <Icon name="Search" size={48} className="mx-auto mb-3 text-purple-400" />
                    <p>Начните вводить имя</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ПРОФИЛЬ */}
        {activeTab === "profile" && (
          <div className="flex-1 p-6 overflow-y-auto scrollbar-thin">
            <div className="max-w-lg mx-auto">
              <h1 className="font-heading text-2xl font-bold text-gradient mb-8">Мой профиль</h1>
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4 animate-float">
                  <div className="w-28 h-28 rounded-3xl flex items-center justify-center text-white text-3xl font-bold"
                    style={{ background: "linear-gradient(135deg, #8B5CF6, #22D3EE)", boxShadow: "0 0 0 3px rgba(139,92,246,0.5), 0 0 30px rgba(139,92,246,0.3)" }}>
                    ЮВ
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl flex items-center justify-center text-white neon-glow"
                    style={{ background: "#8B5CF6" }}>
                    <Icon name="Camera" size={14} />
                  </button>
                  <span className="absolute bottom-0 left-0 w-4 h-4 rounded-full border-2 border-background online-dot"
                    style={{ background: "#34D399" }} />
                </div>
                <h2 className="font-heading text-2xl font-bold">Юрий Васильев</h2>
                <p className="text-muted-foreground text-sm mt-1">@yuriy_v</p>
              </div>
              <div className="space-y-3">
                {[
                  { icon: "User", label: "Имя", value: "Юрий Васильев" },
                  { icon: "AtSign", label: "Никнейм", value: "@yuriy_v" },
                  { icon: "Phone", label: "Телефон", value: "+7 900 000-00-00" },
                  { icon: "Smile", label: "Статус", value: "🚀 Всегда на связи" },
                  { icon: "MapPin", label: "Город", value: "Москва, Россия" },
                ].map((item, i) => (
                  <div key={i} className="glass glass-hover p-4 rounded-2xl flex items-center gap-3 cursor-pointer transition-all">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.2)" }}>
                      <Icon name={item.icon} size={18} style={{ color: "#8B5CF6" }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { value: contacts.length, label: "Контактов", color: "#8B5CF6" },
                  { value: chats.length, label: "Чатов", color: "#22D3EE" },
                  { value: groups.length, label: "Групп", color: "#34D399" },
                ].map((stat, i) => (
                  <div key={i} className="glass p-4 rounded-2xl text-center">
                    <p className="text-2xl font-bold font-heading" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* НАСТРОЙКИ */}
        {activeTab === "settings" && (
          <div className="flex-1 p-6 overflow-y-auto scrollbar-thin">
            <div className="max-w-lg mx-auto">
              <h1 className="font-heading text-2xl font-bold text-gradient mb-8">Настройки</h1>
              <div className="space-y-2">
                {[
                  {
                    section: "Аккаунт",
                    items: [
                      { icon: "Shield", label: "Конфиденциальность", desc: "Настройки приватности", color: "#8B5CF6" },
                      { icon: "Bell", label: "Уведомления", desc: "Звуки и push-уведомления", color: "#22D3EE" },
                      { icon: "Lock", label: "Безопасность", desc: "Пароль и 2FA", color: "#34D399" },
                    ]
                  },
                  {
                    section: "Внешний вид",
                    items: [
                      { icon: "Palette", label: "Тема", desc: "Тёмная • Неон", color: "#F472B6" },
                      { icon: "Type", label: "Шрифт", desc: "Golos Text", color: "#FB923C" },
                      { icon: "Globe", label: "Язык", desc: "Русский", color: "#A78BFA" },
                    ]
                  },
                  {
                    section: "Общение",
                    items: [
                      { icon: "Video", label: "Видеозвонки", desc: "Камера и микрофон", color: "#22D3EE" },
                      { icon: "MessageSquare", label: "Сообщения", desc: "Автоудаление, архив", color: "#8B5CF6" },
                    ]
                  }
                ].map((group, gi) => (
                  <div key={gi} className="mb-6">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1">{group.section}</p>
                    <div className="space-y-1">
                      {group.items.map((item, ii) => (
                        <div key={ii} className="glass glass-hover p-4 rounded-2xl flex items-center gap-3 cursor-pointer transition-all">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `${item.color}20`, border: `1px solid ${item.color}30` }}>
                            <Icon name={item.icon} size={18} style={{ color: item.color }} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                          <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button className="w-full glass p-4 rounded-2xl flex items-center gap-3 transition-all"
                  style={{ border: "1px solid rgba(239,68,68,0.2)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.15)" }}>
                    <Icon name="LogOut" size={18} style={{ color: "#EF4444" }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: "#EF4444" }}>Выйти из аккаунта</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* МОДАЛ ВИДЕОЗВОНКА */}
      {isVideoCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)" }}>
          <div className="relative w-full max-w-2xl mx-4 rounded-3xl overflow-hidden animate-scale-in"
            style={{ border: "1px solid rgba(34,211,238,0.3)", boxShadow: "0 0 60px rgba(34,211,238,0.15)" }}>
            <div className="relative h-96 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(14,20,40,0.95), rgba(14,14,30,0.98))" }}>
              <div className="text-center">
                <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 animate-pulse-ring"
                  style={{ background: "linear-gradient(135deg, #22D3EE, #8B5CF6)" }}>
                  АС
                </div>
                <p className="font-heading text-xl font-bold">Алексей Смирнов</p>
                <p className="text-muted-foreground text-sm mt-1">Соединение...</p>
              </div>
              <div className="absolute top-4 right-4 w-32 h-24 rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-sm font-bold text-muted-foreground">ЮВ</span>
                </div>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <button className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-110 glass">
                  <Icon name="Mic" size={20} className="text-white" />
                </button>
                <button className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-110 glass">
                  <Icon name="Video" size={20} style={{ color: "#22D3EE" }} />
                </button>
                <button onClick={() => setIsVideoCall(false)}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "#EF4444", boxShadow: "0 0 20px rgba(239,68,68,0.4)" }}>
                  <Icon name="PhoneOff" size={22} className="text-white" />
                </button>
                <button className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-110 glass">
                  <Icon name="Volume2" size={20} className="text-white" />
                </button>
                <button className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-110 glass">
                  <Icon name="Maximize2" size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
