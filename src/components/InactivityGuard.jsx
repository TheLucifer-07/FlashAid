// FILE: src/components/InactivityGuard.jsx
export default function InactivityGuard({ visible, secondsLeft }) {
  if (!visible) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-[#e63946]/30 bg-[rgba(230,57,70,0.12)] px-5 py-4 text-sm font-medium text-[#ffb3ba]">
      ⚠️ No activity detected. Alarm in {secondsLeft} seconds.
    </div>
  );
}
