import { motion } from 'framer-motion';

const Privacy = () => {
  const sectionStyle = {
    marginBottom: '2rem'
  };

  const headingStyle = {
    fontSize: 'calc(1.2vw + 1.2rem)',
    color: '#FFE1FF',
    marginBottom: '1rem',
    marginTop: '2rem'
  };

  const paragraphStyle = {
    marginBottom: '1rem',
    lineHeight: '1.6'
  };

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
        marginBottom: '1rem',
        color: '#FFE1FF'
      }}>
        Privacy Policy
      </h1>
      
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Effective Date: January 27, 2025
      </p>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Introduction</h2>
        <p style={paragraphStyle}>
          Welcome to Shabbat Zman. We are committed to protecting your privacy and ensuring that any personal 
          information you provide is handled responsibly. This Privacy Policy explains how we collect, use, 
          and protect your information when you use our service.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Information We Collect</h2>
        <p style={paragraphStyle}>
          To provide you with accurate zmanim (Jewish prayer times), Shabbat Zman collects the following information:
        </p>
        <p style={paragraphStyle}>
          <strong>Location Data:</strong> We use your device's location to calculate zmanim specific to your geographic area.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>How We Use Your Information</h2>
        <p style={paragraphStyle}>
          The location data we collect is used solely for the following purpose:
        </p>
        <ul style={{ marginLeft: '20px', marginBottom: '1rem' }}>
          <li>To calculate and display accurate zmanim for your location.</li>
        </ul>
        <p style={paragraphStyle}>
          We do not store, retain, or share your location data. Once the zmanim are displayed, your data is 
          no longer accessible to us.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Data Sharing and Storage</h2>
        <p style={paragraphStyle}>
          <strong>Data Sharing:</strong> Shabbat Zman does not share your information with third parties.
        </p>
        <p style={paragraphStyle}>
          <strong>Data Storage:</strong> We do not store or hold on to your location data. It is used in real 
          time and discarded immediately after use.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Third-Party Services</h2>
        <p style={paragraphStyle}>
          Shabbat Zman may use third-party tools, such as geolocation APIs, to calculate zmanim. These tools 
          process location data in real time and are used solely for the purpose of providing our service. 
          These third-party services adhere to their own privacy policies, and we recommend reviewing them 
          for additional details.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Your Choices</h2>
        <p style={paragraphStyle}>
          <strong>Location Permissions:</strong> You have control over whether to share your location with 
          Shabbat Zman. You can enable or disable location services in your device settings.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Children's Privacy</h2>
        <p style={paragraphStyle}>
          Shabbat Zman is not intended for use by children under the age of 13. We do not knowingly collect 
          personal information from children. If we become aware that we have inadvertently collected such 
          information, we will take steps to delete it.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Analytics</h2>
        <p style={paragraphStyle}>
          Shabbat Zman does not use analytics tools or collect additional usage data beyond the real-time 
          location data necessary to calculate zmanim.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Security</h2>
        <p style={paragraphStyle}>
          We implement industry-standard security measures to protect your data during transmission and 
          processing. However, no method of electronic transmission or storage is completely secure, and 
          we cannot guarantee absolute security.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Legal Compliance</h2>
        <p style={paragraphStyle}>
          Shabbat Zman complies with applicable data protection regulations, including the General Data 
          Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). If you are a resident 
          of California or the European Union, you may have additional rights regarding your personal data, 
          including the right to access, delete, or restrict the processing of your information.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Changes to This Privacy Policy</h2>
        <p style={paragraphStyle}>
          We may update this Privacy Policy from time to time. Any changes will be effective immediately upon 
          posting the revised policy on our website. Your continued use of the service after any changes 
          constitutes your acceptance of the updated Privacy Policy.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Contact Us</h2>
        <p style={paragraphStyle}>
          If you have any questions or concerns about this Privacy Policy, please contact us at:
        </p>
        <p style={paragraphStyle}>
          Email: rafibaridesstudio@gmail.com
        </p>
      </div>

      <p style={{ 
        textAlign: 'center',
        marginTop: '3rem',
        color: '#FFE1FF',
        fontSize: 'calc(0.6vw + 0.8rem)'
      }}>
        Thank you for using Shabbat Zman.
      </p>
    </motion.div>
  );
};

export default Privacy; 