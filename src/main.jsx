import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/fonts.css'
import './index.css'
import App from './App.jsx'

// Developer Easter Egg
console.log(`%c
✨ Thanks for checking out the console! ✨

🕯️ Developed by Rafi Barides
🌟 Let's connect! https://www.linkedin.com/in/rafibarides/

🙏 Shabbat Shalom!
`, 'color: #FFE1FF; font-size: 14px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
