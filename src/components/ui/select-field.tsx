"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Custom select styled to the Figma "Form / Services Dropdown" component —
 * a native <select> can't render the dark menu panel, purple hover rows, or
 * lime selected check. Follows the APG select-only combobox pattern: focus
 * stays on the trigger, aria-activedescendant tracks the highlighted option.
 */
export function SelectField({
  name,
  options,
  placeholder,
  required,
}: {
  name: string;
  options: readonly string[];
  placeholder: string;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const openMenu = (at = Math.max(0, options.indexOf(value))) => {
    setActive(at);
    setOpen(true);
  };

  const selectOption = (option: string) => {
    setValue(option);
    setOpen(false);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const { key } = event;
    if (key === "Tab") {
      setOpen(false);
      return;
    }
    // First-letter jump, like a native select
    if (key.length === 1 && /\S/.test(key)) {
      const lower = key.toLowerCase();
      const from = (open ? active : Math.max(0, options.indexOf(value))) + 1;
      const match = options
        .map((_, i) => (from + i) % options.length)
        .find((i) => options[i].toLowerCase().startsWith(lower));
      if (match !== undefined) (open ? setActive : openMenu)(match);
      return;
    }
    const handled = ["ArrowDown", "ArrowUp", "Home", "End", "Enter", " ", "Escape"];
    if (!handled.includes(key) || (key === "Escape" && !open)) return;
    event.preventDefault();
    if (!open) {
      openMenu(key === "End" ? options.length - 1 : key === "Home" ? 0 : undefined);
      return;
    }
    if (key === "ArrowDown") setActive((i) => Math.min(i + 1, options.length - 1));
    else if (key === "ArrowUp") setActive((i) => Math.max(i - 1, 0));
    else if (key === "Home") setActive(0);
    else if (key === "End") setActive(options.length - 1);
    else if (key === "Escape") setOpen(false);
    else selectOption(options[active]);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
        aria-activedescendant={open ? `${id}-option-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className={`flex h-14 w-full cursor-pointer items-center justify-between gap-3 rounded-md border bg-white/8 px-[18px] text-left text-base outline-none transition-colors ${
          open
            ? "border-accent shadow-[0_0_5px_rgba(231,254,37,0.12)]"
            : "border-white/16 hover:border-white/40 focus:border-accent focus:shadow-[0_0_5px_rgba(231,254,37,0.12)]"
        } ${value ? "text-white" : "text-white/40"}`}
      >
        {value || placeholder}
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M3 6L8 11L13 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </button>
      <ul
        ref={listRef}
        id={`${id}-listbox`}
        role="listbox"
        aria-label={placeholder}
        className={`absolute inset-x-0 top-[calc(100%+8px)] z-20 max-h-[400px] overflow-y-auto rounded-md border border-white/16 bg-[#171717] py-2 shadow-[0_12px_28px_rgba(0,0,0,0.28)] animate-dropdown-in ${open ? "" : "hidden"}`}
      >
        {options.map((option, index) => (
          <li
            key={option}
            id={`${id}-option-${index}`}
            role="option"
            aria-selected={option === value}
            onMouseEnter={() => setActive(index)}
            onClick={() => selectOption(option)}
            className={`relative flex h-12 cursor-pointer items-center justify-between px-[18px] text-[15px] text-white after:absolute after:inset-x-[18px] after:bottom-0 after:h-px after:bg-white/8 last:after:hidden ${
              option === value
                ? "bg-brand font-medium"
                : index === active
                  ? "bg-brand-800"
                  : ""
            }`}
          >
            {option}
            {option === value && (
              <svg viewBox="0 0 16 16" aria-hidden className="size-4 shrink-0">
                <path d="M3 8.2L6.3 11.3L13 4.8" stroke="#E7FE25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            )}
          </li>
        ))}
      </ul>
      {/* Real input so the browser's required-field validation still fires;
          sits invisibly at the field's bottom edge so the bubble anchors there. */}
      <input
        type="text"
        name={name}
        value={value}
        required={required}
        readOnly
        aria-hidden
        tabIndex={-1}
        onFocus={() => triggerRef.current?.focus()}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-full opacity-0"
      />
    </div>
  );
}
