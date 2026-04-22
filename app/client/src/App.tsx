import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Channels from "./pages/Channels";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";

function Router() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <Switch>
          <Route path={"/"} component={Dashboard} />
          <Route path={"/inventory"} component={Inventory} />
          <Route path={"/channels"} component={Channels} />
          <Route path={"/messages"} component={Messages} />
          <Route path={"/settings"} component={Settings} />
          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
