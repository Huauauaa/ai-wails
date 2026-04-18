const items = ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"];

export function MenuBar() {
  return (
    <header
      className="flex h-[30px] shrink-0 items-center gap-1 border-b border-[var(--vscode-border)] px-2 text-[13px] text-[#cccccc]"
      style={{ background: "var(--vscode-menuBar-bg)" }}
    >
      {items.map((label) => (
        <button
          key={label}
          type="button"
          className="rounded px-2 py-0.5 hover:bg-white/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
        >
          {label}
        </button>
      ))}
    </header>
  );
}
