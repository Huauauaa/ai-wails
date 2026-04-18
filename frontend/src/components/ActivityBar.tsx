import {
  IconExplorer,
  IconExtensions,
  IconRun,
  IconSearch,
  IconSourceControl,
} from "./icons";

export type ActivityId = "explorer" | "search" | "scm" | "run" | "extensions";

type Props = {
  active: ActivityId;
  onChange: (id: ActivityId) => void;
};

const entries: { id: ActivityId; label: string; Icon: typeof IconExplorer }[] = [
  { id: "explorer", label: "Explorer", Icon: IconExplorer },
  { id: "search", label: "Search", Icon: IconSearch },
  { id: "scm", label: "Source Control", Icon: IconSourceControl },
  { id: "run", label: "Run and Debug", Icon: IconRun },
  { id: "extensions", label: "Extensions", Icon: IconExtensions },
];

export function ActivityBar({ active, onChange }: Props) {
  return (
    <nav
      className="flex w-12 shrink-0 flex-col items-center gap-0.5 border-r border-[var(--vscode-border)] py-2"
      style={{ background: "var(--vscode-activityBar-bg)" }}
      aria-label="Activity bar"
    >
      {entries.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            title={label}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onChange(id)}
            className="relative flex h-12 w-12 items-center justify-center text-[#858585] hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          >
            {isActive && (
              <span
                className="absolute left-0 top-2 h-8 w-0.5 rounded-r bg-white"
                aria-hidden
              />
            )}
            <Icon className={isActive ? "text-white" : undefined} />
          </button>
        );
      })}
    </nav>
  );
}
