import { motion } from 'framer-motion';

const Support = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        color: '#ffffff',
        fontFamily: 'Urbanist',
        lineHeight: 1.6
      }}
    >
      <h1 style={{ 
        fontSize: 'calc(1.5vw + 1.5rem)',
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#FFE1FF'
      }}>
        Shabbat Zman Support
      </h1>

      <div style={{ marginBottom: '2rem' }}>
        <p>
          Thank you for using the Shabbat Zman app! This document provides helpful tips and guidance for troubleshooting 
          common issues and ensuring you get the most out of your experience. If you encounter any difficulties or need 
          additional support, feel free to reach out to us at <strong>rafibaridesstudio@gmail.com</strong>.
        </p>
      </div>

      <hr style={{ border: '1px solid rgba(255,255,255,0.1)', margin: '2rem 0' }} />

      <h2 style={{ 
        fontSize: 'calc(1.2vw + 1.2rem)',
        color: '#FFE1FF',
        marginBottom: '1.5rem'
      }}>
        Common Issues & Solutions
      </h2>

      {[
        {
          title: "App Not Loading or Displaying Incorrect Information",
          solutions: [
            "Ensure Stable Internet Connection: Make sure you have a strong and stable internet connection.",
            "Refresh the App: Close and reopen the app to refresh the data.",
            "Clear Cache: If the issue persists, clear your browser cache or app data.",
            "Update Location Permissions: Check that you have granted location access to the app."
          ]
        },
        {
          title: "Location Not Detected Correctly",
          solutions: [
            "Enable Location Services: Ensure location services are turned on for your device.",
            "Manually Enter Location: If auto-detection fails, input your location manually.",
            "Check GPS Settings: Ensure GPS is accurate and functional on your device."
          ]
        },
        {
          title: "Incorrect Zmanim Displayed",
          solutions: [
            "Verify Time Zone Settings: Ensure your device's time zone is correct.",
            "Re-enter Location: Sometimes re-selecting your location can resolve discrepancies.",
            "Restart Device: Restart your device to refresh system settings."
          ]
        },
        {
          title: "Unable to Access Certain Features",
          solutions: [
            "Update the App: Check for updates and ensure you're using the latest version.",
            "Check Browser Compatibility: Ensure your browser is up-to-date if using the web version.",
            "Contact Support: If features remain inaccessible, reach out to us for assistance."
          ]
        },
        {
          title: "Feedback or Feature Requests",
          solutions: [
            "We value your input! Send any feedback or feature suggestions to rafibaridesstudio@gmail.com."
          ]
        }
      ].map((section, index) => (
        <div key={index} style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            fontSize: 'calc(0.8vw + 1rem)',
            color: '#FFE1FF',
            marginBottom: '1rem'
          }}>
            {index + 1}. {section.title}
          </h3>
          <ul style={{ paddingLeft: '20px' }}>
            {section.solutions.map((solution, sIndex) => (
              <li key={sIndex} style={{ marginBottom: '0.5rem' }}>{solution}</li>
            ))}
          </ul>
        </div>
      ))}

      <hr style={{ border: '1px solid rgba(255,255,255,0.1)', margin: '2rem 0' }} />

      <h2 style={{ 
        fontSize: 'calc(1.2vw + 1.2rem)',
        color: '#FFE1FF',
        marginBottom: '1.5rem'
      }}>
        Support Contact Information
      </h2>
      <p>If you require further assistance, please contact us:</p>
      <ul style={{ paddingLeft: '20px' }}>
        <li>Email: rafibaridesstudio@gmail.com</li>
        <li>Response Time: We aim to respond within 24-48 hours.</li>
      </ul>

      <div style={{ 
        textAlign: 'center',
        marginTop: '3rem',
        color: '#FFE1FF',
        fontSize: 'calc(0.6vw + 0.8rem)'
      }}>
        Thank you for choosing the Shabbat Zman app! We are committed to enhancing your experience and appreciate your feedback.
      </div>
    </motion.div>
  );
};

export default Support; 