# Roadmap for Dynamic Weather and Shabbat Times Webpage

## Overview
This project is a single-page dynamic web application to display weather information and Jewish Shabbat times based on the user's location. The app will use:

- **Geolocation API** to detect user location.
- **Weather API** to fetch current weather data (specifically sunset time. We do not intend to build a weather application).
- Custom calculations for Shabbat start/end times.
- **provide times like sunset, shabbat start, Netz Hachamah, Rabeinu Tam (+72 minutes), shabbat end, etc. in a nice format**

Feature Description
The app will automatically refresh its displayed Shabbat data every Sunday at midnight to ensure it always shows the next week's relevant information. This will be achieved using a scheduled JavaScript function that triggers at the specified time.

Technical Implementation
Date Check Logic:

Use setInterval to periodically check the current date and time.
Compare the current day and time against the target (Sunday, 12:00 AM).
Refetch Data:

When the condition is met, call the fetchData function to retrieve updated Shabbat and weather data.
Update the component's state with the new data.
Optimization:

Use clearInterval once the update has been triggered to avoid redundant checks.
Restart the interval after the update for the next cycle.

WeatherAPI.com provides access to free weather and geo data via a JSON/XML restful API. It allows developers to create desktop, web and mobile applications using this data very easy.

They provide following data through their API:

Real-time weather
14 day weather forecast
Historical weather
Marine Weather and Tide Data New
Future Weather (Upto 300 days ahead) New
Daily and hourly intervals
15 min intervalNew (Enterprise only)
Astronomy
Time zone
Sports
Location data
Search or Autocomplete API
Weather Alerts New
Air Quality Data New
Bulk Request New
Solar Irradiance New
Evapotranspiration (Enterprise) New
Wind at 100m (Enterprise) New

We also have SDK for popular framework/languages available on Github for quick integrations.

Want to choose which weather field to return in the API response? Change it from API response fields.

API access to the data is protected by an API key. If at anytime, you find the API key has become vulnerable, please regenerate the key using Regenerate button next to the API key.


Authentication to the WeatherAPI.com API is provided by passing your API key as request parameter through an API .

Request
Request to WeatherAPI.com API consists of base url and API method. You can make both HTTP or HTTPS request to our API.

Base URL: http://api.weatherapi.com/v1

API	API Method
Current weather	/current.json or /current.xml
Forecast	/forecast.json or /forecast.xml
Search or Autocomplete	/search.json or /search.xml
History	/history.json or /history.xml
Alerts	/alerts.json or /alerts.xml
Marine	/marine.json or /marine.xml
Future	/future.json or /future.xml
Time Zone	/timezone.json or /timezone.xml
Sports	/sports.json or /sports.xml
Astronomy	/astronomy.json or /astronomy.xml
IP Lookup	/ip.json or /ip.xml

No backend will be used; it will rely entirely on frontend logic and APIs. The app will feature a clean and responsive UI with Tailwind CSS for styling.

---

## Tech Stack

### Frameworks and Libraries
1. **React** (Frontend)
2. **Tailwind CSS** (Styling)
3. **Fetch API** (Data fetching)
4. **Vite** (Build tool, hot reloading)

### APIs
1. **Geolocation API** (Browser API for user location)
2. **Weather API** (e.g., OpenWeatherMap or WeatherAPI.com)

### Utilities
- **Node.js** and **npm** (Dependency management)
- **ESLint** (Code linting)
- **Prettier** (Code formatting)

### Deployment
- **GitHub Pages**

---

## Project Structure

```plaintext
src/
├── components/
│   ├── Header.jsx
│   ├── WeatherDisplay.jsx
│   ├── ShabbatTimes.jsx
│   ├── Footer.jsx
│
├── hooks/
│   └── useGeolocation.js
│
├── utils/
│   └── fetchData.js
│
├── styles/
│   └── index.css
│
├── App.jsx
├── index.js
└── index.html
```

---

## Detailed Technical Descriptions

### 1. **Geolocation**
- **Goal:** Automatically fetch user location when the page loads.
- **Implementation:**
  - Use the Geolocation API to get `latitude` and `longitude`.
  - If permission is denied, show an input box for manual location entry.

**Code Example:**
```javascript
const useGeolocation = () => {
  const [location, setLocation] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => setError(err.message)
      );
    } else {
      setError("Geolocation not supported");
    }
  }, []);

  return { location, error };
};

export default useGeolocation;
```

---

### 2. **Fetching Data**
- **Goal:** Retrieve weather data using the Weather API.
- **Implementation:**
  - Use `fetchData` utility for API calls.
  - Handle errors gracefully.

**fetchData.js:**
```javascript
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return [await response.json(), null];
    } else {
      return [await response.text(), null];
    }
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export default fetchData;
```

---

### 3. **Shabbat Time Calculations**
- **Goal:** Compute Shabbat start and end times based on location and date.
- **Logic:**
  - Fetch sunset times for Friday from the Weather API.
  - Add 40 minutes to sunset for end-of-Shabbat time on Saturday night.
  - Provide times like sunset, shabbat start, Netz Hachamah, Rabeinu Tam (+72 minutes), shabbat end, etc. in a nice format

**Code Example:**
```javascript
const calculateShabbatTimes = (sunsetTime) => {
  const shabbatStart = new Date(sunsetTime);
  const shabbatEnd = new Date(shabbatStart);
  shabbatEnd.setMinutes(shabbatEnd.getMinutes() + 40); // Add 40 minutes

  return {
    shabbatStart: shabbatStart.toLocaleTimeString(),
    shabbatEnd: shabbatEnd.toLocaleTimeString(),
  };
};
```

---

### 4. **React Components**


#### LocationInput.jsx
- Displays a input box for manual location entry.

#### ShabbatTimes.jsx
- Displays calculated Shabbat times.
- **Props:**
  - `shabbatTimes` (object): Contains `shabbatStart` and `shabbatEnd` times.


---

## Steps Envisioned

### Phase 1: Setup
1. Initialize a React project with `create-react-app`.
2. Install dependencies: `npm install tailwindcss`.
3. Set up Tailwind CSS configuration.

### Phase 2: Build
1. Create the layout with components: `Header`, `WeatherDisplay`, `ShabbatTimes`, `Footer`.
2. Implement `useGeolocation` to fetch user location.
3. Add `fetchData` utility to call the Weather API.
4. Calculate and display Shabbat times dynamically.

### Phase 3: Styling
1. Design a responsive layout using Tailwind CSS.
2. Add gradients and modern styles for a polished look.

### Phase 4: Testing and Deployment
1. Test functionality across devices and browsers.
2. Deploy on GitHub Pages using `gh-pages`.

# Asset Report

### Asset Details
All assets are `.avif` files with transparent backgrounds. Files are located in `public/assets/images/`.

---

## Libraries to Install
1. **React** (via `create-react-app`): Frontend framework.
2. **Tailwind CSS**: Styling framework.
3. **ESLint** and **Prettier** (optional): Code linting and formatting.


