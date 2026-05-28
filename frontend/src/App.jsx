import { useState } from 'react'
import Questionnaire from './components/Questionnaire'
import ResultsDashboard from './components/ResultsDashboard'
import ResourcePanel from './components/ResourcePanel'

export default function App() {
  const [result, setResult] = useState(null)

  const handleRetake = () => setResult(null)

  return (
    <div style={s.page}>
      <header style={s.header}>
        <h1 style={s.brand}>MindCheck</h1>
        <p style={s.tagline}>Early mental health risk screening for students</p>
      </header>

      <main style={s.main}>
        {!result ? (
          <Questionnaire onResult={setResult} />
        ) : (
          <>
            <ResultsDashboard result={result} onRetake={handleRetake} />
            <ResourcePanel riskLevel={result.prediction} />
          </>
        )}
      </main>

      <footer style={s.footer}>
        For research purposes only — not a clinical diagnosis tool.
      </footer>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', background: '#f8fafc', fontFamily: 'system-ui, sans-serif' },
  header: { background: 'white', borderBottom: '1px solid #e2e8f0', padding: '20px 24px', textAlign: 'center' },
  brand: { fontSize: 24, fontWeight: 800, color: '#1e40af', margin: 0 },
  tagline: { fontSize: 13, color: '#94a3b8', margin: '4px 0 0' },
  main: { maxWidth: 600, margin: '0 auto', paddingTop: '2rem' },
  footer: { textAlign: 'center', padding: '2rem', fontSize: 12, color: '#94a3b8', borderTop: '1px solid #e2e8f0', marginTop: '2rem' },
}