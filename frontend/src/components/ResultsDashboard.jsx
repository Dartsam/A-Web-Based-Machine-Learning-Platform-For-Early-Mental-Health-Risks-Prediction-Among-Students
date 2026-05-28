export default function ResultsDashboard({ result, onRetake }) {
  if (result.error) {
    return (
      <div style={s.wrap}>
        <div style={s.errorBox}>
          <p style={{ fontWeight: 600, marginBottom: 6 }}>Something went wrong</p>
          <p style={{ fontSize: 14 }}>{result.error}</p>
        </div>
        <button style={s.retakeBtn} onClick={onRetake}>Try again</button>
      </div>
    )
  }

  const isHigh = result.prediction === 'High risk'
  const color = isHigh ? '#dc2626' : '#16a34a'
  const bg    = isHigh ? '#fef2f2' : '#f0fdf4'
  const pct   = result.depression_prob ?? 0

  return (
    <div style={s.wrap}>
      <h2 style={s.title}>Your Assessment Results</h2>

      <div style={{ ...s.riskCard, background: bg, border: `2px solid ${color}` }}>
        <p style={s.riskLabel}>Depression risk level</p>
        <p style={{ ...s.riskValue, color }}>{result.prediction}</p>
        <p style={s.conf}>Model confidence: {result.confidence}%</p>
      </div>

      <div style={s.meterWrap}>
        <div style={s.meterLabel}>
          <span>Depression probability</span>
          <span style={{ color, fontWeight: 600 }}>{pct}%</span>
        </div>
        <div style={s.meterTrack}>
          <div style={{ ...s.meterFill, width: `${pct}%`, background: color }} />
        </div>
      </div>

      <div style={s.disclaimer}>
        ⚠ This tool is for screening purposes only and does not replace a 
        professional diagnosis. Please speak to a counsellor if you are concerned.
      </div>

      <button style={s.retakeBtn} onClick={onRetake}>Take assessment again</button>
    </div>
  )
}

const s = {
  wrap: { maxWidth: 520, margin: '0 auto', padding: '2rem 1.5rem', fontFamily: 'system-ui, sans-serif' },
  title: { fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 20 },
  riskCard: { borderRadius: 14, padding: '20px 24px', marginBottom: 20 },
  riskLabel: { fontSize: 13, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' },
  riskValue: { fontSize: 32, fontWeight: 800, marginBottom: 4 },
  conf: { fontSize: 14, color: '#64748b' },
  meterWrap: { marginBottom: 20 },
  meterLabel: { display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#475569', marginBottom: 6 },
  meterTrack: { height: 8, background: '#e2e8f0', borderRadius: 4 },
  meterFill: { height: 8, borderRadius: 4, transition: 'width 1s ease' },
  disclaimer: { fontSize: 13, color: '#92400e', background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 8, padding: '12px 14px', lineHeight: 1.6, marginBottom: 20 },
  retakeBtn: { width: '100%', padding: '12px', fontSize: 15, fontWeight: 600, background: '#1e293b', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer' },
  errorBox: { background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 10, padding: 16, color: '#991b1b', marginBottom: 16 },
}