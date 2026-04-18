import { useEffect, useState } from "react";
import {
  ChooseBlogWorkDir,
  GetBlogWorkDir,
  GetDefaultBlogWorkDir,
  SetBlogWorkDir,
} from "../../wailsjs/go/main/App";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved?: (path: string) => void;
};

export function PreferencesDialog({ open, onClose, onSaved }: Props) {
  const [path, setPath] = useState("");
  const [defaultPath, setDefaultPath] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setError(null);
    void (async () => {
      try {
        const [cur, def] = await Promise.all([GetBlogWorkDir(), GetDefaultBlogWorkDir()]);
        setPath(cur);
        setDefaultPath(def);
      } catch {
        setPath("");
        setDefaultPath("");
      }
    })();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleBrowse = async () => {
    setError(null);
    try {
      const picked = await ChooseBlogWorkDir();
      if (picked) setPath(picked);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const handleSave = async () => {
    const p = path.trim();
    if (!p) {
      setError("Path cannot be empty.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await SetBlogWorkDir(p);
      onSaved?.(p);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-[min(100%-2rem,480px)] rounded border border-[var(--vscode-border)] bg-[#252526] p-4 shadow-xl"
        role="dialog"
        aria-labelledby="prefs-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 id="prefs-title" className="mb-3 text-[13px] font-semibold text-[#cccccc]">
          Preference
        </h2>
        <p className="mb-2 text-[12px] text-[#858585]">
          Blog working directory. Default:{" "}
          <span className="allow-select font-mono text-[#b5cea8]">{defaultPath || "—"}</span>
        </p>
        <label className="mb-1 block text-[11px] uppercase text-[#858585]">Directory</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="allow-select min-w-0 flex-1 rounded border border-[var(--vscode-border)] bg-[#3c3c3c] px-2 py-1.5 font-mono text-[12px] text-[#cccccc] focus:border-[#007fd4] focus:outline-none"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            spellCheck={false}
          />
          <button
            type="button"
            className="shrink-0 rounded border border-[var(--vscode-border)] bg-[#3c3c3c] px-3 py-1.5 text-[12px] text-[#cccccc] hover:bg-[#454545]"
            onClick={() => void handleBrowse()}
          >
            Browse…
          </button>
        </div>
        {error && <p className="mt-2 text-[12px] text-[#f48771]">{error}</p>}
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            className="rounded px-3 py-1.5 text-[12px] text-[#cccccc] hover:bg-white/10"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={saving}
            className="rounded bg-[#0e639c] px-3 py-1.5 text-[12px] text-white hover:bg-[#1177bb] disabled:opacity-50"
            onClick={() => void handleSave()}
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
