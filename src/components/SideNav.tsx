import Icon from "@/components/ui/icon";

type Tab = "contacts" | "chats" | "groups" | "search" | "profile" | "settings";

interface SideNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  totalUnread: number;
}

const navItems: { tab: Tab; icon: string; label: string }[] = [
  { tab: "contacts", icon: "Users", label: "Контакты" },
  { tab: "chats", icon: "MessageCircle", label: "Чаты" },
  { tab: "groups", icon: "UsersRound", label: "Группы" },
  { tab: "search", icon: "Search", label: "Поиск" },
  { tab: "profile", icon: "CircleUser", label: "Профиль" },
  { tab: "settings", icon: "Settings2", label: "Настройки" },
];

export default function SideNav({ activeTab, onTabChange, totalUnread }: SideNavProps) {
  return (
    <>
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
            onClick={() => onTabChange(tab)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 relative group ${
              activeTab === tab ? "neon-glow" : "glass-hover opacity-50 hover:opacity-100"
            }`}
            style={activeTab === tab ? { background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(34,211,238,0.3))", border: "1px solid rgba(139,92,246,0.5)" } : {}}
            title={label}
          >
            <Icon name={icon} size={20} className={activeTab === tab ? "text-white" : "text-muted-foreground"} />
            {tab === "chats" && totalUnread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-white font-bold flex items-center justify-center"
                style={{ background: "#8B5CF6", fontSize: "9px" }}>
                {totalUnread}
              </span>
            )}
          </button>
        ))}
      </nav>
    </>
  );
}
