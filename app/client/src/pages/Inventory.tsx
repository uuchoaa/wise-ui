import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  ChevronDown,
  Plus,
  Search,
  AlertCircle,
  CheckCircle2,
  Clock,
  MoreVertical,
  X,
} from "lucide-react";

interface Item {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  priority: "high" | "medium" | "low";
  status: "draft" | "available" | "reserved" | "sold" | "paused";
  conversations: number;
  whatsappReady: boolean;
  olxReady: boolean;
  lastUpdated: string;
  image?: string;
}

const mockItems: Item[] = [
  {
    id: 1,
    title: "Sofá Cinza",
    subtitle: "base + almofadas",
    price: 850,
    priority: "high",
    status: "available",
    conversations: 3,
    whatsappReady: true,
    olxReady: true,
    lastUpdated: "hoje",
  },
  {
    id: 2,
    title: "Guarda-roupa",
    subtitle: "madeira maciça, 6 portas",
    price: 1200,
    priority: "high",
    status: "reserved",
    conversations: 2,
    whatsappReady: true,
    olxReady: true,
    lastUpdated: "ontem",
  },
  {
    id: 3,
    title: "Mesa de Café",
    subtitle: "vidro + metal",
    price: 300,
    priority: "medium",
    status: "available",
    conversations: 1,
    whatsappReady: true,
    olxReady: false,
    lastUpdated: "2 dias",
  },
  {
    id: 4,
    title: "Ar Condicionado",
    subtitle: "12.000 BTU, 2 anos",
    price: 1500,
    priority: "high",
    status: "draft",
    conversations: 0,
    whatsappReady: false,
    olxReady: false,
    lastUpdated: "agora",
  },
  {
    id: 5,
    title: "Cama Queen",
    subtitle: "base + colchão",
    price: 2000,
    priority: "high",
    status: "sold",
    conversations: 5,
    whatsappReady: true,
    olxReady: true,
    lastUpdated: "3 dias",
  },
];

const statusLabels = {
  draft: "Rascunho",
  available: "Disponível",
  reserved: "Reservado",
  sold: "Vendido",
  paused: "Pausado",
};

const statusColors = {
  draft: "border-muted-foreground text-muted-foreground italic",
  available: "border-accent text-accent",
  reserved: "border-muted-foreground text-muted-foreground",
  sold: "border-muted-foreground text-muted-foreground line-through",
  paused: "border-muted-foreground text-muted-foreground",
};

export default function Inventory() {
  const [items, setItems] = useState<Item[]>(mockItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "expensive" | "drafts">("recent");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);

  // Filter and sort
  let filtered = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  filtered.sort((a, b) => {
    if (sortBy === "expensive") return b.price - a.price;
    if (sortBy === "drafts") return (a.status === "draft" ? -1 : 1);
    return 0; // recent (default order)
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filtered.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    }
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setShowDrawer(true);
  };

  const handleSaveItem = () => {
    if (editingItem) {
      setItems(items.map((item) => (item.id === editingItem.id ? editingItem : item)));
      setShowDrawer(false);
      setEditingItem(null);
    }
  };

  const draftCount = items.filter((item) => item.status === "draft").length;
  const soldCount = items.filter((item) => item.status === "sold").length;
  const reservedCount = items.filter((item) => item.status === "reserved").length;
  const availableCount = items.filter((item) => item.status === "available").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-8 py-6">
        <h1 className="text-2xl font-semibold text-foreground mb-4">Estoque</h1>

        {/* Counter Line */}
        <p className="text-xs text-muted-foreground mb-6 space-x-4">
          <span>
            <span className="font-medium text-foreground">{items.length}</span> itens
          </span>
          <span>
            <span className="font-medium text-foreground">{soldCount}</span> vendidos
          </span>
          <span>
            <span className="font-medium text-foreground">{reservedCount}</span> reservados
          </span>
          <span>
            <span className="font-medium text-foreground">{availableCount}</span> disponíveis
          </span>
          <span>
            <span className="font-medium text-foreground">{draftCount}</span> rascunhos
          </span>
        </p>

        {/* Filters & Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-2.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por título ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-8 text-xs border-b border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter || ""}
              onChange={(e) => setStatusFilter(e.target.value || null)}
              className="text-xs px-3 py-2 border border-border rounded-sm bg-background text-foreground cursor-pointer appearance-none pr-8"
            >
              <option value="">Todos os status</option>
              <option value="draft">Rascunho</option>
              <option value="available">Disponível</option>
              <option value="reserved">Reservado</option>
              <option value="sold">Vendido</option>
            </select>
            <ChevronDown size={14} className="absolute right-2 top-2.5 text-muted-foreground pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs px-3 py-2 border border-border rounded-sm bg-background text-foreground cursor-pointer appearance-none pr-8"
            >
              <option value="recent">Recentes</option>
              <option value="expensive">Mais caros</option>
              <option value="drafts">Rascunhos primeiro</option>
            </select>
            <ChevronDown size={14} className="absolute right-2 top-2.5 text-muted-foreground pointer-events-none" />
          </div>

          {/* Buttons */}
          <Button>
            <Plus size={14} className="mr-1" />
            Adicionar itens
          </Button>
          <Button
            disabled={selectedItems.length === 0}
          >
            Ações em lote
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-secondary border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-foreground w-8">
                <input
                  type="checkbox"
                  checked={selectedItems.length === filtered.length && filtered.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Foto</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Item</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Preço</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Prioridade</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Status</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Interesse</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Pronto para</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Atualizado</th>
              <th className="px-4 py-3 text-left font-medium text-foreground w-8"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border cursor-pointer"
                onClick={() => handleEditItem(item)}
              >
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                    className="cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="w-8 h-8 bg-muted rounded-sm"></div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{item.subtitle}</p>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono-data text-foreground">R$ {item.price.toLocaleString("pt-BR")}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block text-xs px-2 py-1 rounded-sm ${
                      item.priority === "high"
                        ? "bg-destructive text-destructive-foreground"
                        : item.priority === "medium"
                          ? "bg-secondary text-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.priority === "high" ? "Alta" : item.priority === "medium" ? "Média" : "Baixa"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block text-xs px-2 py-1 border rounded-sm ${statusColors[item.status]}`}>
                    {statusLabels[item.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-foreground">
                  {item.conversations > 0 ? (
                    <span className="text-xs font-medium">{item.conversations} conversa{item.conversations > 1 ? "s" : ""}</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1" title="Status de publicação">
                    {item.whatsappReady && (
                      <CheckCircle2 size={14} className="text-accent" />
                    )}
                    {!item.olxReady && item.status !== "draft" && (
                      <AlertCircle size={14} className="text-destructive" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{item.lastUpdated}</td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <button className="p-1 hover:bg-secondary rounded-sm">
                    <MoreVertical size={14} className="text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Side Drawer */}
      {showDrawer && editingItem && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setShowDrawer(false)}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-background border-l border-border shadow-lg flex flex-col animate-in slide-in-from-right-96 duration-150">
            {/* Header */}
            <div className="border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Editar item</h2>
              <button
                onClick={() => setShowDrawer(false)}
                className="p-1 hover:bg-secondary rounded-sm"
              >
                <X size={16} className="text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto px-6 py-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Título</label>
                <Input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full text-xs border border-border rounded-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Descrição</label>
                <Input
                  type="text"
                  value={editingItem.subtitle}
                  onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                  className="w-full text-xs border border-border rounded-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Preço</label>
                <Input
                  type="number"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                  className="w-full text-xs border border-border rounded-sm px-3 py-2 font-mono-data"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Status</label>
                <select
                  value={editingItem.status}
                  onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as any })}
                  className="w-full text-xs border border-border rounded-sm px-3 py-2 bg-background text-foreground cursor-pointer"
                >
                  <option value="draft">Rascunho</option>
                  <option value="available">Disponível</option>
                  <option value="reserved">Reservado</option>
                  <option value="sold">Vendido</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Prioridade</label>
                <select
                  value={editingItem.priority}
                  onChange={(e) => setEditingItem({ ...editingItem, priority: e.target.value as any })}
                  className="w-full text-xs border border-border rounded-sm px-3 py-2 bg-background text-foreground cursor-pointer"
                >
                  <option value="high">Alta</option>
                  <option value="medium">Média</option>
                  <option value="low">Baixa</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border px-6 py-4 flex gap-2">
              <Button
                onClick={handleSaveItem}
                className="flex-1"
              >
                Salvar
              </Button>
              <Button
                onClick={() => setShowDrawer(false)}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
