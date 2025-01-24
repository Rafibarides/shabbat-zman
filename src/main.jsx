import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/fonts.css'
import './index.css'
import App from './App.jsx'

// Developer Easter Egg
console.log(`
✨ Thanks for checking out the console! ✨

🕯️ Developed by Rafi Barides
🌟 Let's connect! https://www.linkedin.com/in/rafibarides/

🙏 Shabbat Shalom!
`)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
