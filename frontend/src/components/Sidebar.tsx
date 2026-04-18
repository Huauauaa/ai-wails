import { useState } from "react";
import { IconChevronDown, IconChevronRight } from "./icons";
import type { ActivityId } from "./ActivityBar";

type Props = {
  activity: ActivityId;
  width: number;
  onResizeStart: () => void;
};

function FileTree() {
  const [open, setOpen] = useState(true);

  return (
    <div className="select-none text-[13px]">
      <button
        type="button"
        className="flex w-full items-center gap-0.5 px-2 py-1 text-left uppercase tracking-wide text-[#bbbbbb] hover:bg-[var(--vscode-list-hover)]"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? (
          <IconChevronDown className="shrink-0 opacity-80" />
        ) : (
          <IconChevronRight className="shrink-0 opacity-80" />
        )}
        <span className="font-semibold">ai-wails</span>
      </button>
      {open && (
        <ul className="ml-3 border-l border-[var(--vscode-border)] pl-1">
          <li className="flex cursor-pointer items-center gap-1 px-2 py-0.5 hover:bg-[var(--vscode-list-hover)]">
            <span className="text-[#e37933]">{"{}"}</span>
            <span className="text-[#cccccc]">main.go</span>
          </li>
          <li className="flex cursor-pointer items-center gap-1 px-2 py-0.5 hover:bg-[var(--vscode-list-hover)]">
            <span className="text-[#519aba]">TS</span>
            <span className="text-[#cccccc]">App.tsx</span>
          </li>
          <li className="flex cursor-pointer items-center gap-1 px-2 py-0.5 hover:bg-[var(--vscode-list-hover)]">
            <span className="text-[#6a9955]">✓</span>
            <span className="text-[#cccccc]">README</span>
          </li>
        </ul>
      )}
    </div>
  );
}

function SidebarBody({ activity }: { activity: ActivityId }) {
  if (activity === "explorer") {
    return (
      <div className="flex flex-col">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-[#bbbbbb]">
          Explorer
        </div>
        <FileTree />
      </div>
    );
  }

  if (activity === "search") {
    return (
      <div className="p-3">
        <div className="mb-2 text-[11px] font-bold uppercase text-[#bbbbbb]">Search</div>
        <input
          type="search"
          placeholder="Search"
          className="allow-select w-full rounded border border-[var(--vscode-border)] bg-[#3c3c3c] px-2 py-1 text-[13px] text-white placeholder:text-[#888] focus:border-[#007fd4] focus:outline-none"
        />
      </div>
    );
  }

  return (
    <div className="p-3 text-[13px] text-[#cccccc] opacity-80">
      {activity === "scm" && "No source control providers registered."}
      {activity === "run" && "Run and debug: configure launch.json to get started."}
      {activity === "extensions" && "Search extensions in the marketplace (demo UI)."}
    </div>
  );
}

export function Sidebar({ activity, width, onResizeStart }: Props) {
  return (
    <aside
      className="relative flex min-w-0 shrink-0 flex-col border-r border-[var(--vscode-border)]"
      style={{ width, background: "var(--vscode-sideBar-bg)" }}
    >
      <SidebarBody activity={activity} />
      <button
        type="button"
        aria-label="Resize sidebar"
        className="absolute -right-1 top-0 z-10 h-full w-2 cursor-col-resize hover:bg-[#007fd4]/30"
        onMouseDown={(e) => {
          e.preventDefault();
          onResizeStart();
        }}
      />
    </aside>
  );
}
