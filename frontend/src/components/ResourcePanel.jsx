const resources = {
  high: [
    { title: 'Speak to your campus counsellor', desc: 'Book a confidential session through your institution\'s student support office.' },
    { title: 'Nigeria suicide prevention helpline', desc: 'Call 0800-800-2000 — free, confidential, 24/7.' },
    { title: 'WHO mental health support', desc: 'Visit who.int/mental-health for self-help guides and local resources.' },
    { title: 'Crisis text line', desc: 'Text HOME to a crisis line if you are unable to speak right now.' },
  ],
  low: [
    { title: 'Maintain healthy sleep habits', desc: 'Aim for 7–9 hours. Consistent sleep times improve mood and focus.' },
    { title: 'Physical activity', desc: 'Even 20 minutes of walking daily significantly reduces anxiety and depression risk.' },
    { title: 'Connect with others', desc: 'Social support is one of the strongest protective factors against depression.' },
    { title: 'Mindfulness and stress tracking', desc: 'Apps like Headspace or Calm offer free student tiers for guided meditation.' },
  ]
}

export default function ResourcePanel({ riskLevel }) {
  const isHigh = riskLevel === 'High risk'
  const items = isHigh ? resources.high : resources.low
  const heading = isHigh
    ? 'Recommended support resources'
    : 'Tips to maintain your wellbeing'

  return (
    <div style={s.wrap}>
      <h3 style={s.heading}>{heading}</h3>
      {items.map((r, i) => (
        <div key={i} style={s.card}>
          <p style={s.rtitle}>{r.title}</p>
          <p style={s.rdesc}>{r.desc}</p>
        </div>
      ))}
    </div>
  )
}

const s = {
  wrap: { maxWidth: 520, margin: '0 auto', padding: '0 1.5rem 2rem', fontFamily: 'system-ui, sans-serif' },
  heading: { fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 12 },
  card: { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '12px 16px', marginBottom: 8 },
  rtitle: { fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 3 },
  rdesc: { fontSize: 13, color: '#64748b', lineHeight: 1.6 },
}