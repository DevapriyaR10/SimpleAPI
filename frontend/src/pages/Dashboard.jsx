import { api, setToken } from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!token) return navigate("/login");
    setToken(token);
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError("");

    try {
      await api.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    } finally {
      setCreating(false);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <div style={styles.logoContainer}>
              <svg style={styles.logoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <h1 style={styles.logo}>Task Manager</h1>
            </div>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.roleChip}>
              <svg style={styles.roleIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span style={styles.roleText}>{role.toUpperCase()}</span>
            </div>
            <button onClick={logout} style={styles.logoutBtn}>
              <svg style={styles.logoutIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.container}>
        {/* Create Task Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Create New Task</h2>
            <svg style={styles.cardIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>

          <form onSubmit={createTask} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Task Title</label>
              <input
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.textarea}
                rows="3"
                required
              />
            </div>

            {error && (
              <div style={styles.errorBox}>
                <svg style={styles.errorIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span style={styles.errorText}>{error}</span>
              </div>
            )}

            <button 
              type="submit" 
              style={{
                ...styles.createBtn,
                ...(creating ? styles.btnDisabled : {})
              }}
              disabled={creating}
            >
              {creating ? (
                <>
                  <span style={styles.spinner}></span>
                  Creating...
                </>
              ) : (
                <>
                  <svg style={styles.btnIcon} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Create Task
                </>
              )}
            </button>
          </form>
        </div>

        {/* Tasks List */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>All Tasks</h2>
            <div style={styles.taskCount}>{tasks.length}</div>
          </div>

          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
              <p style={styles.loadingText}>Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div style={styles.emptyState}>
              <svg style={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 style={styles.emptyTitle}>No tasks yet</h3>
              <p style={styles.emptyText}>Create your first task to get started</p>
            </div>
          ) : (
            <div style={styles.taskList}>
              {tasks.map((task) => (
                <div key={task._id} style={styles.taskCard}>
                  <div style={styles.taskContent}>
                    <div style={styles.taskHeader}>
                      <h3 style={styles.taskTitle}>{task.title}</h3>
                      <svg style={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p style={styles.taskDescription}>{task.description}</p>
                    <div style={styles.taskFooter}>
                      <span style={styles.taskDate}>
                        <svg style={styles.dateIcon} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {new Date(task.createdAt || Date.now()).toLocaleDateString()}
                      </span>
                      {role === "admin" && (
                        <button
                          style={styles.deleteBtn}
                          onClick={() => deleteTask(task._id)}
                        >
                          <svg style={styles.deleteIcon} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
  },
  header: {
    backgroundColor: "white",
    borderBottom: "1px solid #e5e7eb",
    padding: "16px 20px",
    position: "sticky",
    top: 0,
    zIndex: 10,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center"
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  logoIcon: {
    width: "32px",
    height: "32px",
    color: "#667eea"
  },
  logo: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1a202c",
    margin: 0
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  roleChip: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    backgroundColor: "#ede9fe",
    borderRadius: "20px",
    border: "1px solid #c4b5fd"
  },
  roleIcon: {
    width: "16px",
    height: "16px",
    color: "#7c3aed"
  },
  roleText: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#7c3aed"
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    color: "#6b7280",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  logoutIcon: {
    width: "16px",
    height: "16px"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 20px"
  },
  card: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "28px",
    marginBottom: "24px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px"
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1a202c",
    margin: 0
  },
  cardIcon: {
    width: "24px",
    height: "24px",
    color: "#667eea"
  },
  taskCount: {
    backgroundColor: "#667eea",
    color: "white",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151"
  },
  input: {
    padding: "12px 16px",
    fontSize: "15px",
    border: "2px solid #e5e7eb",
    borderRadius: "10px",
    outline: "none",
    transition: "all 0.3s ease",
    fontFamily: "inherit"
  },
  textarea: {
    padding: "12px 16px",
    fontSize: "15px",
    border: "2px solid #e5e7eb",
    borderRadius: "10px",
    outline: "none",
    transition: "all 0.3s ease",
    fontFamily: "inherit",
    resize: "vertical"
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 16px",
    backgroundColor: "#fee2e2",
    borderRadius: "10px",
    border: "1px solid #fecaca"
  },
  errorIcon: {
    width: "20px",
    height: "20px",
    color: "#dc2626",
    flexShrink: 0
  },
  errorText: {
    fontSize: "14px",
    color: "#dc2626",
    fontWeight: "500"
  },
  createBtn: {
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
  btnDisabled: {
    opacity: 0.7,
    cursor: "not-allowed"
  },
  btnIcon: {
    width: "20px",
    height: "20px"
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTopColor: "white",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
    display: "inline-block"
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px"
  },
  loadingSpinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e5e7eb",
    borderTopColor: "#667eea",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite"
  },
  loadingText: {
    marginTop: "16px",
    color: "#6b7280",
    fontSize: "14px"
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px"
  },
  emptyIcon: {
    width: "64px",
    height: "64px",
    color: "#d1d5db",
    margin: "0 auto 16px"
  },
  emptyTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#374151",
    margin: "0 0 8px 0"
  },
  emptyText: {
    fontSize: "14px",
    color: "#9ca3af",
    margin: 0
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  taskCard: {
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    padding: "20px",
    transition: "all 0.3s ease",
    backgroundColor: "#fafafa"
  },
  taskContent: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  taskHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  taskTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1a202c",
    margin: 0,
    flex: 1
  },
  checkIcon: {
    width: "24px",
    height: "24px",
    color: "#10b981",
    flexShrink: 0
  },
  taskDescription: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
    lineHeight: "1.6"
  },
  taskFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px"
  },
  taskDate: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: "#9ca3af"
  },
  dateIcon: {
    width: "16px",
    height: "16px"
  },
  deleteBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    backgroundColor: "#fee2e2",
    border: "1px solid #fecaca",
    borderRadius: "8px",
    color: "#dc2626",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  deleteIcon: {
    width: "16px",
    height: "16px"
  }
};

// Add CSS animations and hover effects
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  input:focus, textarea:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  button:not(:disabled):hover {
    transform: translateY(-2px);
  }
  
  button:not(:disabled):active {
    transform: translateY(0);
  }
  
  .task-card:hover {
    border-color: #667eea !important;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  }
`;
document.head.appendChild(styleSheet);