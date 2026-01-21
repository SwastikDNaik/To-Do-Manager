function AllTasksModal({ allTasks, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          width: "500px",
          maxHeight: "80vh",
          overflowY: "auto",
          borderRadius: "8px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>All Tasks</h3>
          <button onClick={onClose}>❌</button>
        </div>

        <hr />

<div style={{ marginTop: "10px", fontSize: "14px" }}>
  <p style={{ margin: "4px 0" }}>
    <span style={{ color: "green", fontWeight: "bold" }}>●</span>{" "}
    Completed Task
  </p>
  <p style={{ margin: "4px 0" }}>
    <span style={{ color: "red", fontWeight: "bold" }}>●</span>{" "}
    Not Completed Task
  </p>
</div>

        {allTasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {allTasks.map((task, index) => (
              <li
               key={task._id}
               style={{
               padding: "8px",
               borderBottom: "1px solid #ddd",
               color: task.status === "done" ? "green" : "red",
               fontWeight: "bold",
              }}
            >
                <b>{index + 1}. {task.title}</b>
                <br />
                <small>
                  📅 {new Date(task.date).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AllTasksModal;
