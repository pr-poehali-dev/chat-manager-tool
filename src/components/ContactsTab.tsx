import Icon from "@/components/ui/icon";

interface Contact {
  id: number;
  name: string;
  status: string;
  lastSeen: string;
  avatar: string;
  color: string;
  mood: string;
  phone: string;
  mutual: number;
}

interface ContactsTabProps {
  contacts: Contact[];
  selectedContact: number | null;
  searchQuery: string;
  onSelectContact: (id: number) => void;
  onSearchChange: (query: string) => void;
  onOpenChat: (id: number) => void;
  onVideoCall: () => void;
}

export default function ContactsTab({
  contacts,
  selectedContact,
  searchQuery,
  onSelectContact,
  onSearchChange,
  onOpenChat,
  onVideoCall,
}: ContactsTabProps) {
  const selectedContactData = contacts.find(c => c.id === selectedContact);
  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Список контактов */}
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
              onChange={e => onSearchChange(e.target.value)}
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
              onClick={() => onSelectContact(contact.id)}
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

      {/* Карточка контакта */}
      {selectedContact && selectedContactData ? (
        <div className="flex-1 flex flex-col items-center justify-start pt-12 px-8 animate-fade-in overflow-y-auto scrollbar-thin">
          <button onClick={() => onSelectContact(0)} className="self-start mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
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
            <button onClick={() => onOpenChat(selectedContactData.id)}
              className="flex flex-col items-center gap-2 px-5 py-3 rounded-2xl transition-all hover:scale-105"
              style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}>
              <Icon name="MessageCircle" size={20} style={{ color: "#8B5CF6" }} />
              <span className="text-xs font-medium">Написать</span>
            </button>
            <button onClick={onVideoCall}
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
  );
}
