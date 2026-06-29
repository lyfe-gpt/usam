import { useState, useEffect, useRef } from "react";

// Property-address input with OpenStreetMap Nominatim autocomplete. Only the
// typed address text is sent to Nominatim (debounced 500ms per their usage
// policy). Used by the Apply flow.
export default function AddressAutocomplete({ value, onChange }) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    onChange(q);
    clearTimeout(timerRef.current);
    if (q.length < 2) { setSuggestions([]); setOpen(false); return; }
    timerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&countrycodes=us&limit=5`,
          { headers: { "Accept-Language": "en" } }
        );
        const data = await res.json();
        setSuggestions(data.map((r) => r.display_name));
        setOpen(data.length > 0);
      } catch {
        setSuggestions([]); setOpen(false);
      }
      // 500ms debounce: respects OpenStreetMap Nominatim's usage policy and
      // sends fewer keystrokes of the typed address to the third-party service.
    }, 500);
  };

  const pick = (addr) => {
    setQuery(addr);
    onChange(addr);
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <input
        className="ci"
        type="text"
        aria-label="Property address"
        placeholder="Street, city, state"
        value={query}
        onChange={handleChange}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        autoComplete="off"
      />
      {open && (
        <ul style={{
          position: "absolute", zIndex: 999, top: "calc(100% + 4px)", left: 0, right: 0,
          background: "#fff", border: "1px solid #D0D5DD", borderRadius: 10,
          boxShadow: "0 8px 24px rgba(0,0,0,0.10)", margin: 0, padding: 0, listStyle: "none",
        }}>
          {suggestions.map((addr, i) => (
            <li
              key={i}
              onMouseDown={() => pick(addr)}
              style={{
                padding: "10px 14px", fontSize: 14, color: "#0E1A2B", cursor: "pointer",
                borderBottom: i < suggestions.length - 1 ? "1px solid #F2F4F7" : "none",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#F9FAFB"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              {addr}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
