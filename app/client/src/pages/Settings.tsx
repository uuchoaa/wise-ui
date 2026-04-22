import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Save, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    sellerName: "Seu Nome",
    phone: "(11) 98765-4321",
    location: "Pinheiros, São Paulo",
    moveDate: "2026-05-04",
    acceptOffers: true,
    autoArchiveAfterDays: 7,
    defaultPriority: "medium",
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-8 py-6">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Configurações</h1>
        <p className="text-xs text-muted-foreground">
          Gerencie suas preferências e informações pessoais.
        </p>
      </div>

      {/* Content */}
      <div className="p-8 max-w-2xl space-y-6">
        {/* Success Message */}
        {saved && (
          <div className="flex items-center gap-2 p-3 bg-accent/10 border border-accent rounded-sm">
            <CheckCircle2 size={16} className="text-accent flex-shrink-0" />
            <p className="text-xs text-accent">Configurações salvas com sucesso.</p>
          </div>
        )}

        {/* Profile Section */}
        <Card className="border border-border rounded-sm p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">Perfil</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Seu nome</label>
              <Input
                type="text"
                value={settings.sellerName}
                onChange={(e) => setSettings({ ...settings, sellerName: e.target.value })}
                className="w-full text-xs border border-border rounded-sm px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Telefone</label>
              <Input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full text-xs border border-border rounded-sm px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Localização</label>
              <Input
                type="text"
                value={settings.location}
                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                className="w-full text-xs border border-border rounded-sm px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Data da mudança</label>
              <Input
                type="date"
                value={settings.moveDate}
                onChange={(e) => setSettings({ ...settings, moveDate: e.target.value })}
                className="w-full text-xs border border-border rounded-sm px-3 py-2"
              />
            </div>
          </div>
        </Card>

        {/* Selling Preferences */}
        <Card className="border border-border rounded-sm p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">Preferências de venda</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-foreground">Aceitar ofertas</p>
                <p className="text-xs text-muted-foreground mt-1">Compradores podem fazer contrapropostas</p>
              </div>
              <input
                type="checkbox"
                checked={settings.acceptOffers}
                onChange={(e) => setSettings({ ...settings, acceptOffers: e.target.checked })}
                className="cursor-pointer"
              />
            </div>

            <div className="border-t border-border pt-4">
              <label className="block text-xs font-medium text-foreground mb-1">
                Arquivar itens após (dias sem interesse)
              </label>
              <Input
                type="number"
                value={settings.autoArchiveAfterDays}
                onChange={(e) =>
                  setSettings({ ...settings, autoArchiveAfterDays: Number(e.target.value) })
                }
                className="w-full text-xs border border-border rounded-sm px-3 py-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Itens sem conversas serão marcados como "pausa" após este período.
              </p>
            </div>

            <div className="border-t border-border pt-4">
              <label className="block text-xs font-medium text-foreground mb-1">Prioridade padrão</label>
              <select
                value={settings.defaultPriority}
                onChange={(e) => setSettings({ ...settings, defaultPriority: e.target.value })}
                className="w-full text-xs border border-border rounded-sm px-3 py-2 bg-background text-foreground cursor-pointer"
              >
                <option value="high">Alta</option>
                <option value="medium">Média</option>
                <option value="low">Baixa</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Data & Privacy */}
        <Card className="border border-border rounded-sm p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">Dados e privacidade</h2>

          <div className="space-y-3">
            <div className="flex items-start gap-2 p-3 bg-muted/10 border border-muted/20 rounded-sm">
              <AlertCircle size={14} className="text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Seus dados são armazenados localmente no navegador. Nada é enviado para servidores externos.
              </p>
            </div>

            <Button className="w-full">
              Exportar dados
            </Button>

            <Button variant="destructive" className="w-full">
              Limpar tudo
            </Button>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex gap-2">
            <Button
              onClick={handleSave}
              variant="primary"
              className="flex-1 flex items-center justify-center gap-2"
            >
              <Save size={14} />
              Salvar configurações
            </Button>
        </div>
      </div>
    </div>
  );
}
