import { useState, useMemo } from "react";

function formatNumber(value) {
  if (value === "" || value === null || value === undefined) return "0";
  const num = Number(value);
  if (!Number.isFinite(num)) return String(value);
  return num.toString();
}

export default function Calculator() {
  const [current, setCurrent] = useState("0");
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [overwrite, setOverwrite] = useState(false);
  const [history, setHistory] = useState([]);

  const display = useMemo(() => formatNumber(current), [current]);

  function inputDigit(digit) {
    setCurrent((prev) => {
      if (overwrite) {
        setOverwrite(false);
        return digit === "." ? "0." : digit;
      }
      if (digit === ".") {
        if (prev.includes(".")) return prev;
        return prev + ".";
      }
      if (prev === "0") return digit;
      return prev + digit;
    });
  }

  function clearAll() {
    setCurrent("0");
    setPrevious(null);
    setOperator(null);
    setOverwrite(false);
  }

  function backspace() {
    setCurrent((prev) => {
      if (overwrite) {
        setOverwrite(false);
        return "0";
      }
      if (prev.length <= 1) return "0";
      return prev.slice(0, -1);
    });
  }

  function toggleSign() {
    setCurrent((prev) => {
      if (prev === "0") return prev;
      return prev.startsWith("-") ? prev.slice(1) : "-" + prev;
    });
  }

  function chooseOperator(nextOperator) {
    if (operator && !overwrite) {
      // chain calculations
      const result = compute(previous, current, operator);
      setPrevious(result);
      setCurrent(String(result));
      setOverwrite(true);
      setOperator(nextOperator);
      return;
    }
    setOperator(nextOperator);
    setPrevious(current);
    setOverwrite(true);
  }

  function compute(a, b, op) {
    const x = Number(a);
    const y = Number(b);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return 0;
    switch (op) {
      case "+":
        return x + y;
      case "-":
        return x - y;
      case "*":
        return x * y;
      case "/":
        return y === 0 ? NaN : x / y;
      default:
        return y;
    }
  }

  function equals() {
    if (operator == null || previous == null) return;
    const result = compute(previous, current, operator);
    const entry = {
      id: Date.now(),
      expression: `${formatNumber(previous)} ${operator} ${formatNumber(
        current
      )} =`,
      result,
    };
    setHistory((h) => [entry, ...h].slice(0, 50));
    setCurrent(String(result));
    setPrevious(null);
    setOperator(null);
    setOverwrite(true);
  }

  function reuseHistory(entry) {
    // Put the result back into current; user can continue from there
    setCurrent(String(entry.result));
    setOverwrite(true);
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "flex-start",
        padding: 16,
      }}
    >
      <div
        style={{
          width: 320,
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: 12,
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            height: 64,
            marginBottom: 12,
            padding: 8,
            background: "#111827",
            color: "#f9fafb",
            borderRadius: 6,
            fontSize: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            overflowX: "auto",
          }}
        >
          {display}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 8,
          }}
        >
          <CalcButton onClick={clearAll} variant="muted">
            AC
          </CalcButton>
          <CalcButton onClick={backspace} variant="muted">
            ⌫
          </CalcButton>
          <CalcButton onClick={toggleSign} variant="muted">
            ±
          </CalcButton>
          <CalcButton onClick={() => chooseOperator("/")} variant="op">
            /
          </CalcButton>

          <CalcButton onClick={() => inputDigit("7")}>7</CalcButton>
          <CalcButton onClick={() => inputDigit("8")}>8</CalcButton>
          <CalcButton onClick={() => inputDigit("9")}>9</CalcButton>
          <CalcButton onClick={() => chooseOperator("*")} variant="op">
            ×
          </CalcButton>

          <CalcButton onClick={() => inputDigit("4")}>4</CalcButton>
          <CalcButton onClick={() => inputDigit("5")}>5</CalcButton>
          <CalcButton onClick={() => inputDigit("6")}>6</CalcButton>
          <CalcButton onClick={() => chooseOperator("-")} variant="op">
            −
          </CalcButton>

          <CalcButton onClick={() => inputDigit("1")}>1</CalcButton>
          <CalcButton onClick={() => inputDigit("2")}>2</CalcButton>
          <CalcButton onClick={() => inputDigit("3")}>3</CalcButton>
          <CalcButton onClick={() => chooseOperator("+")} variant="op">
            +
          </CalcButton>

          <CalcButton
            onClick={() => inputDigit("0")}
            style={{ gridColumn: "span 2" }}
          >
            0
          </CalcButton>
          <CalcButton onClick={() => inputDigit(".")}>.</CalcButton>
          <CalcButton onClick={equals} variant="equals">
            =
          </CalcButton>
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 240 }}>
        <h3 style={{ margin: 0, marginBottom: 8 }}>History</h3>
        {history.length === 0 ? (
          <p style={{ color: "#6b7280", marginTop: 8 }}>No history yet</p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {history.map((h) => (
              <li key={h.id}>
                <button
                  onClick={() => reuseHistory(h)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                    padding: 8,
                    background: "white",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    {h.expression}
                  </div>
                  <div style={{ fontSize: 16 }}>{formatNumber(h.result)}</div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function CalcButton({ children, onClick, variant, style }) {
  let background = "#111827";
  let color = "#f9fafb";
  if (variant === "muted") {
    background = "#374151";
  }
  if (variant === "op") {
    background = "#2563eb";
  }
  if (variant === "equals") {
    background = "#059669";
  }
  return (
    <button
      onClick={onClick}
      style={{
        padding: "14px 10px",
        borderRadius: 6,
        border: "none",
        background,
        color,
        fontSize: 18,
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
