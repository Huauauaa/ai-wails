import { useCallback, useEffect, useRef, useState } from "react";
import type { ActivityId } from "./components/ActivityBar";
import { ActivityBar } from "./components/ActivityBar";
import { BottomPanel } from "./components/BottomPanel";
import type { EditorTab } from "./components/EditorGroup";
import { EditorGroup } from "./components/EditorGroup";
import { MenuBar } from "./components/MenuBar";
import { Sidebar } from "./components/Sidebar";
import { StatusBar } from "./components/StatusBar";

const initialTabs: EditorTab[] = [
  { id: "welcome", title: "Welcome.tsx", dirty: true },
  { id: "readme", title: "README.md" },
];

export default function App() {
  const [activity, setActivity] = useState<ActivityId>("explorer");
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [panelHeight, setPanelHeight] = useState(200);
  const [panelVisible, setPanelVisible] = useState(true);
  const [tabs, setTabs] = useState<EditorTab[]>(initialTabs);
  const [activeTabId, setActiveTabId] = useState("welcome");

  const dragRef = useRef<"sidebar" | "panel" | null>(null);

  const onSidebarResizeStart = useCallback(() => {
    dragRef.current = "sidebar";
    document.body.style.cursor = "col-resize";
  }, []);

  const onPanelResizeStart = useCallback(() => {
    dragRef.current = "panel";
    document.body.style.cursor = "row-resize";
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragRef.current === "sidebar") {
        const next = Math.min(480, Math.max(180, e.clientX - 48));
        setSidebarWidth(next);
      } else if (dragRef.current === "panel") {
        const h = window.innerHeight - e.clientY;
        setPanelHeight(Math.min(520, Math.max(120, h)));
      }
    };
    const onUp = () => {
      dragRef.current = null;
      document.body.style.cursor = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const handleCloseTab = (id: string) => {
    setTabs((prev) => {
      const next = prev.filter((t) => t.id !== id);
      const newTabs = next.length === 0 ? [{ id: "untitled", title: "Untitled-1", dirty: true }] : next;

      setActiveTabId((activeId) => {
        if (activeId !== id) return activeId;
        const idx = prev.findIndex((t) => t.id === id);
        return (newTabs[Math.max(0, idx - 1)] ?? newTabs[0]).id;
      });

      return newTabs;
    });
  };

  return (
    <div className="flex h-full flex-col bg-[#1e1e1e]">
      <MenuBar />
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1">
          <ActivityBar active={activity} onChange={setActivity} />
          <Sidebar activity={activity} width={sidebarWidth} onResizeStart={onSidebarResizeStart} />
          <div className="flex min-w-0 flex-1 flex-col">
            <EditorGroup
              tabs={tabs}
              activeId={activeTabId}
              onSelect={setActiveTabId}
              onClose={handleCloseTab}
            />
            <BottomPanel
              height={panelHeight}
              visible={panelVisible}
              onResizeStart={onPanelResizeStart}
              onToggle={() => setPanelVisible((v) => !v)}
            />
          </div>
        </div>
        <StatusBar />
      </div>
    </div>
  );
}
