import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.iconContainer}>
          <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        
        <h1 style={styles.title}>Welcome to Task Manager</h1>
        <p style={styles.subtitle}>Manage tasks securely with role-based access control</p>

        <div style={styles.buttonGroup}>
          <Link to="/login" style={styles.link}>
            <button style={styles.button}>
              Login
              <svg style={styles.buttonIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>

          <Link to="/register" style={styles.link}>
            <button style={styles.buttonSecondary}>
              Create Account
            </button>
          </Link>
        </div>

        <div style={styles.features}>
          <div style={styles.feature}>
            <svg style={styles.featureIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span style={styles.featureText}>Secure & Reliable</span>
          </div>
          
          <div style={styles.feature}>
            <svg style={styles.featureIcon} viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span style={styles.featureText}>Role-Based Access</span>
          </div>
          
          <div style={styles.feature}>
            <svg style={styles.featureIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span style={styles.featureText}>Easy Task Management</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
  },
  content: {
    background: "white",
    borderRadius: "20px",
    padding: "60px 40px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    textAlign: "center"
  },
  iconContainer: {
    width: "80px",
    height: "80px",
    margin: "0 auto 24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    width: "48px",
    height: "48px",
    color: "white"
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1a202c",
    margin: "0 0 12px 0"
  },
  subtitle: {
    fontSize: "16px",
    color: "#718096",
    margin: "0 0 40px 0",
    lineHeight: "1.6"
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "40px"
  },
  link: {
    textDecoration: "none"
  },
  button: {
    width: "100%",
    padding: "14px 28px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
  },
  buttonIcon: {
    width: "20px",
    height: "20px"
  },
  buttonSecondary: {
    width: "100%",
    padding: "14px 28px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    border: "2px solid #667eea",
    borderRadius: "10px",
    backgroundColor: "white",
    color: "#667eea",
    transition: "all 0.3s ease"
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    paddingTop: "30px",
    borderTop: "1px solid #e2e8f0"
  },
  feature: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#4a5568"
  },
  featureIcon: {
    width: "24px",
    height: "24px",
    color: "#667eea"
  },
  featureText: {
    fontSize: "14px",
    fontWeight: "500"
  }
};

// Add hover effects using a style tag
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
  }
  
  button:active {
    transform: translateY(0);
  }
`;
document.head.appendChild(styleSheet);