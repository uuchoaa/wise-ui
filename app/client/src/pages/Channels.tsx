import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Link2,
  MessageCircle,
  ShoppingCart,
  Instagram,
  Facebook,
  AlertTriangle,
} from "lucide-react";

interface Channel {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: "connected" | "needs_auth" | "suspended" | "quota_exceeded" | "not_connected";
  postedItems: number;
  activeConversations: number;
  lastActivity: string;
  contactCount?: number;
  quotaInfo?: string;
  groups?: string[];
}

const channels: Channel[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: <MessageCircle size={20} />,
    status: "connected",
    postedItems: 12,
    activeConversations: 8,
    lastActivity: "agora",
    contactCount: 47,
    groups: ["Família", "Amigos da faculdade", "Pais da escola"],
  },
  {
    id: "olx",
    name: "OLX",
    icon: <ShoppingCart size={20} />,
    status: "connected",
    postedItems: 8,
    activeConversations: 5,
    lastActivity: "há 2 horas",
    quotaInfo: "3/5 anúncios gratuitos usados",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: <Instagram size={20} />,
    status: "needs_auth",
    postedItems: 0,
    activeConversations: 0,
    lastActivity: "nunca",
  },
  {
    id: "mercado_livre",
    name: "Mercado Livre",
    icon: <ShoppingCart size={20} />,
    status: "not_connected",
    postedItems: 0,
    activeConversations: 0,
    lastActivity: "nunca",
  },
  {
    id: "facebook",
    name: "Facebook Marketplace",
    icon: <Facebook size={20} />,
    status: "not_connected",
    postedItems: 0,
    activeConversations: 0,
    lastActivity: "nunca",
  },
];

const statusConfig = {
  connected: {
    label: "Conectado",
    color: "text-accent",
    bgColor: "bg-accent/10",
    icon: <CheckCircle2 size={16} />,
  },
  needs_auth: {
    label: "Reautenticar",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    icon: <AlertTriangle size={16} />,
  },
  suspended: {
    label: "Suspenso",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    icon: <AlertCircle size={16} />,
  },
  quota_exceeded: {
    label: "Cota excedida",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    icon: <AlertCircle size={16} />,
  },
  not_connected: {
    label: "Não conectado",
    color: "text-muted-foreground",
    bgColor: "bg-muted/10",
    icon: <Link2 size={16} />,
  },
};

export default function Channels() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-8 py-6">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Canais</h1>
        <p className="text-xs text-muted-foreground">
          Gerencie suas conexões e veja o status de cada canal de publicação.
        </p>
      </div>

      {/* Channels Grid */}
      <div className="p-8 space-y-4">
        {channels.map((channel) => {
          const config = statusConfig[channel.status];
          const isConnected = channel.status === "connected";

          return (
            <Card
              key={channel.id}
              className="border border-border rounded-sm p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-foreground">{channel.icon}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{channel.name}</h3>
                    <div className={`flex items-center gap-1.5 mt-1 text-xs ${config.color}`}>
                      {config.icon}
                      <span>{config.label}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {isConnected ? (
                    <>
                      <Button>
                        Configurar
                      </Button>
                      <Button>
                        Desconectar
                      </Button>
                    </>
                  ) : (
                    <Button>
                      Conectar
                    </Button>
                  )}
                </div>
              </div>

              {/* Stats */}
              {isConnected && (
                <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Itens publicados</p>
                    <p className="text-sm font-medium text-foreground">{channel.postedItems}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Conversas ativas</p>
                    <p className="text-sm font-medium text-foreground">{channel.activeConversations}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Última atividade</p>
                    <p className="text-sm font-medium text-foreground">{channel.lastActivity}</p>
                  </div>
                  {channel.contactCount && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Contatos</p>
                      <p className="text-sm font-medium text-foreground">{channel.contactCount}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Channel-specific info */}
              {channel.id === "whatsapp" && channel.groups && (
                <div>
                  <p className="text-xs font-medium text-foreground mb-2">Grupos para divulgação</p>
                  <div className="space-y-1">
                    {channel.groups.map((group) => (
                      <div key={group} className="flex items-center justify-between text-xs">
                        <span className="text-foreground">• {group}</span>
                        <Button size="sm">
                          Enviar
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {channel.id === "olx" && channel.quotaInfo && (
                <div>
                  <p className="text-xs font-medium text-foreground mb-2">Cota de anúncios</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-3/5 bg-accent" />
                    </div>
                    <span className="text-xs text-muted-foreground">{channel.quotaInfo}</span>
                  </div>
                </div>
              )}

              {channel.status === "needs_auth" && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-sm">
                  <AlertTriangle size={14} className="text-destructive flex-shrink-0" />
                  <p className="text-xs text-destructive">
                    Sua autenticação expirou. Reconecte para continuar publicando.
                  </p>
                </div>
              )}

              {channel.status === "not_connected" && (
                <div className="flex items-center gap-2 p-3 bg-muted/10 border border-muted/20 rounded-sm">
                  <Clock size={14} className="text-muted-foreground flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Conecte este canal para começar a publicar.
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
