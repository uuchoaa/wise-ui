import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Clock, DollarSign, Package } from "lucide-react";
import { useState } from "react";

// Mock data for demonstration
const mockUrgentQueue = [
  {
    id: 1,
    type: "payment",
    description: "João Silva aguardando confirmação de pagamento",
    action: "Confirmar pagamento",
    priority: "high",
  },
  {
    id: 2,
    type: "message",
    description: "Maria Santos respondeu sobre o sofá",
    action: "Responder",
    priority: "medium",
  },
  {
    id: 3,
    type: "stale",
    description: "Guarda-roupa sem interesse há 5 dias",
    action: "Enviar nudge",
    priority: "low",
  },
];

const mockTodayPickups = [
  {
    id: 1,
    time: "14:00",
    buyer: "João Silva",
    items: ["Sofá cinza", "Mesa de café"],
    total: 850,
    status: "confirmed",
  },
  {
    id: 2,
    time: "16:30",
    buyer: "Maria Santos",
    items: ["Guarda-roupa", "Espelho"],
    total: 1200,
    status: "pending_payment",
  },
];

export default function Dashboard() {
  const [completedActions, setCompletedActions] = useState<number[]>([]);

  const daysUntilMove = 12;
  const itemsSold = 8;
  const totalItems = 15;
  const itemsReserved = 3;
  const totalReceived = 3850;
  const totalAgreed = 6200;

  const handleActionComplete = (id: number) => {
    setCompletedActions([...completedActions, id]);
  };

  const visibleQueue = mockUrgentQueue.filter((item) => !completedActions.includes(item.id));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-8 py-6">
        <h1 className="text-2xl font-semibold text-foreground mb-4">Painel</h1>

        {/* Summary Stats */}
        <div className="flex items-center justify-between gap-8 mb-6">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{daysUntilMove}</span> dias até a mudança
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Package size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{itemsSold}</span>/{totalItems} itens vendidos
            </span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">R$ {totalReceived.toLocaleString("pt-BR")}</span> recebido
            </span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">R$ {totalAgreed.toLocaleString("pt-BR")}</span> acordado
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${(itemsSold / totalItems) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 space-y-8">
        {/* Pra fazer agora */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-4 tracking-tight">Pra fazer agora</h2>

          {visibleQueue.length === 0 ? (
            <div className="border border-border rounded-sm p-8 text-center">
              <CheckCircle2 size={32} className="mx-auto mb-3 text-accent" />
              <p className="text-sm text-muted-foreground">Nada urgente agora</p>
            </div>
          ) : (
            <div className="space-y-2">
              {visibleQueue.map((item) => (
                <div
                  key={item.id}
                  className="border border-border rounded-sm p-4 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{item.description}</p>
                  </div>
              <Button
                onClick={() => handleActionComplete(item.id)}
              >
                {item.action}
              </Button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Hoje */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-4 tracking-tight">Hoje</h2>

          {mockTodayPickups.length === 0 ? (
            <div className="border border-border rounded-sm p-8 text-center">
              <p className="text-sm text-muted-foreground">Nenhuma retirada agendada para hoje</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockTodayPickups.map((pickup) => (
                <Card
                  key={pickup.id}
                  className="border border-border rounded-sm p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{pickup.buyer}</p>
                      <p className="text-xs text-muted-foreground mt-1">{pickup.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground font-mono-data">
                        R$ {pickup.total.toLocaleString("pt-BR")}
                      </p>
                      <span
                        className={`inline-block text-xs px-2 py-1 rounded-sm mt-1 ${
                          pickup.status === "confirmed"
                            ? "border border-accent text-accent"
                            : "border border-muted-foreground text-muted-foreground"
                        }`}
                      >
                        {pickup.status === "confirmed" ? "Confirmado" : "Pendente"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-1">Itens:</p>
                    <ul className="text-xs text-foreground space-y-0.5">
                      {pickup.items.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      Marcar retirado
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Reagendar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
