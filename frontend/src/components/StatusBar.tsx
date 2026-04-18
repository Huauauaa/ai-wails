type Props = {
  branch?: string;
};

export function StatusBar({ branch = "main" }: Props) {
  return (
    <footer
      className="flex h-[22px] shrink-0 items-center justify-between gap-2 border-t border-[#007acc] px-2 text-[12px] text-white"
      style={{ background: "var(--vscode-statusBar-bg)" }}
    >
      <div className="flex items-center gap-3">
        <button type="button" className="flex items-center gap-1 hover:underline">
          <span aria-hidden>⎇</span>
          <span>{branch}</span>
        </button>
        <span className="opacity-90">ai-wails</span>
        <span className="hidden opacity-80 sm:inline">0 errors, 0 warnings</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="opacity-90">Ln 1, Col 1</span>
        <span className="opacity-90">UTF-8</span>
        <span className="opacity-90">TypeScript JSX</span>
        <span className="opacity-90">Spaces: 2</span>
      </div>
    </footer>
  );
}
