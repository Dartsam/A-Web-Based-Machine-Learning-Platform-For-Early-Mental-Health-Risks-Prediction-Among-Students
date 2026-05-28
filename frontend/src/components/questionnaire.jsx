import { useState } from 'react'
import axios from 'axios'

const questions = [
  { key: 'Age', label: 'How old are you?', type: 'number', placeholder: 'e.g. 21', min: 10, max: 60 },
  { key: 'Academic Pressure', label: 'Rate your academic pressure (1 = very low, 5 = very high)', type: 'number', placeholder: '1 to 5', min: 1, max: 5 },
  { key: 'CGPA', label: 'What is your current CGPA / GPA?', type: 'number', placeholder: 'e.g. 3.2', min: 0, max: 4 },
  { key: 'Sleep Duration', label: 'How many hours do you sleep on average per night?', type: 'number', placeholder: 'e.g. 6', min: 1, max: 12 },
  { key: 'Financial Stress', label: 'Rate your financial stress (1 = none, 5 = severe)', type: 'number', placeholder: '1 to 5', min: 1, max: 5 },
  { key: 'Study Satisfaction', label: 'How satisfied are you with your studies? (1 = not at all, 5 = very)', type: 'number', placeholder: '1 to 5', min: 1, max: 5 },
  { key: 'Dietary Habits', label: 'How would you rate your diet? (1 = unhealthy, 3 = healthy)', type: 'number', placeholder: '1 to 3', min: 1, max: 3 },
  { key: 'Have you ever had suicidal thoughts ?', label: 'Have you ever had suicidal thoughts? (0 = No, 1 = Yes)', type: 'number', placeholder: '0 or 1', min: 0, max: 1 },
  { key: 'Family History of Mental Illness', label: 'Family history of mental illness? (0 = No, 1 = Yes)', type: 'number', placeholder: '0 or 1', min: 0, max: 1 },
]

export default function Questionnaire({ onResult }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const q = questions[step]
  const progress = Math.round(((step + 1) / questions.length) * 100)

  const handleNext = async () => {
    const val = answers[q.key]
    if (val === undefined || val === '') {
      setError('Please enter a value before continuing.')
      return
    }
    setError('')
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      await handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const API = import.meta.env.VITE_API_URL || ''
      const res = await axios.post(`${API}/predict`, answers)
      onResult(res.data)
    } catch (err) {
      onResult({ error: 'Could not reach the server. Make sure Flask is running.' })
    }
    setLoading(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') handleNext()
  }

  return (
    <div style={s.wrap}>
      <p style={s.stepLabel}>Question {step + 1} of {questions.length}</p>
      <div style={s.barWrap}>
        <div style={{ ...s.bar, width: `${progress}%` }} />
      </div>
      <h2 style={s.question}>{q.label}</h2>
      <input
        style={s.input}
        type={q.type}
        placeholder={q.placeholder}
        min={q.min}
        max={q.max}
        value={answers[q.key] ?? ''}
        onChange={e => setAnswers({ ...answers, [q.key]: parseFloat(e.target.value) })}
        onKeyDown={handleKey}
        autoFocus
      />
      {error && <p style={s.error}>{error}</p>}
      <div style={s.btnRow}>
        {step > 0 && (
          <button style={s.backBtn} onClick={() => setStep(step - 1)}>← Back</button>
        )}
        <button style={s.nextBtn} onClick={handleNext} disabled={loading}>
          {loading ? 'Analysing...' : step === questions.length - 1 ? 'Get my results →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}

const s = {
  wrap: { maxWidth: 520, margin: '0 auto', padding: '2rem 1.5rem', fontFamily: 'system-ui, sans-serif' },
  stepLabel: { fontSize: 13, color: '#888', marginBottom: 6 },
  barWrap: { height: 4, background: '#eee', borderRadius: 2, marginBottom: 28 },
  bar: { height: 4, background: '#3b82f6', borderRadius: 2, transition: 'width 0.3s' },
  question: { fontSize: 20, fontWeight: 600, color: '#1e293b', marginBottom: 20, lineHeight: 1.4 },
  input: { width: '100%', padding: '12px 16px', fontSize: 17, border: '1.5px solid #e2e8f0', borderRadius: 10, marginBottom: 8, boxSizing: 'border-box', outline: 'none' },
  error: { fontSize: 13, color: '#ef4444', marginBottom: 10 },
  btnRow: { display: 'flex', gap: 10, marginTop: 8 },
  backBtn: { padding: '10px 20px', fontSize: 14, border: '1px solid #e2e8f0', borderRadius: 8, background: 'white', cursor: 'pointer', color: '#64748b' },
  nextBtn: { flex: 1, padding: '12px 24px', fontSize: 15, fontWeight: 600, background: '#3b82f6', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer' },
}