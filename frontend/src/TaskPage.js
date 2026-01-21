/* eslint-disable */
import { useEffect, useState } from "react";
import AllTasksModal from "./AllTasksModal";
import "./styles.css";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const username = localStorage.getItem("name");

  const [showAllTasks, setShowAllTasks] = useState(false);
  const [allTasks, setAllTasks] = useState([]);

  const [month, setMonth] = useState(0);
  const year = 2026;

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

const fetchTasks = () => {
  const uid = localStorage.getItem("uid");

  let url = `/api/tasks?uid=${uid}`;
  if (selectedDate) {
    url += `&date=${selectedDate}`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => setTasks(data));
};


const fetchAllTasks = () => {
  const uid = localStorage.getItem("uid");

  fetch(`/api/tasks?uid=${uid}`)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setAllTasks(data);
      } else {
        setAllTasks([]);
      }
    });
};



  useEffect(() => {
    fetchTasks();
  }, [selectedDate]);

  const addTask = () => {
  if (!title.trim()) return;

  const uid = localStorage.getItem("uid");

  fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      uid,
      title,
      date: selectedDate,
    }),
  }).then(() => {
    setTitle("");
    fetchTasks();
  });
};


  const updateStatus = (task, status) => {
    fetch(`/api/tasks/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).then(fetchTasks);
  };

  const deleteTask = (id) => {
    fetch(`/api/tasks/${id}`, { method: "DELETE" }).then(fetchTasks);
  };

  return (
    <div className="app">
      {/* SIDEBAR */}
      <div className={`sidebar ${open ? "open" : ""}`}>
  <div className="sidebar-item" onClick={() => setOpen(!open)}>
    ☰ {open && "Menu"}
  </div>

  <div
    className="sidebar-item"
    onClick={() => {
      fetchAllTasks();
      setShowAllTasks(true);
    }}
  >
    📋 {open && "All Tasks"}
  </div>

  <div
    className="sidebar-footer"
    onClick={() => {
      localStorage.removeItem("uid");
      window.location.reload();
    }}
  >
    🚪 {open && "Logout"}
  </div>
</div>

      {/* MAIN */}
      <div className="main">
        <h2 className="app-header">To-Do Manager</h2>
        <div className="user-greeting">
  <div className="user-name">
    Hi, {username}! 👋
  </div>
  <div className="user-uid">
    UID: {localStorage.getItem("uid")}
  </div>
</div>




        {/* CALENDAR */}
        <div className="section-card1">
          <div className="month-nav">
            <button onClick={() => setMonth(month - 1)}>◀</button>

            <span className="month-label">
              {new Date(year, month).toLocaleString("default", {
                month: "long",
              })}{" "}
              {year}
            </span>

            <button onClick={() => setMonth(month + 1)}>▶</button>
          </div>

          <div className="divider" />

          <div className="calendar">
            {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(d => (
              <div key={d} className="weekday">{d}</div>
            ))}

            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateString = `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

              return (
                <div
                  key={dateString}
                  className={`day ${selectedDate === dateString ? "selected" : ""}`}
                  onClick={() => setSelectedDate(dateString)}
                  onDoubleClick={() => setSelectedDate(null)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {selectedDate !== null && selectedDate !== "" && (
  <div className="section-card selected-date-card">
    <span className="selected-date-text">
      Selected date:{" "}
      {(() => {
        const d = new Date(selectedDate);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.toLocaleDateString(
          "en-US",
          { weekday: "long" }
        )}`;
      })()}
    </span>
  </div>
)}


        {/* TASKS */}
        {selectedDate ? (
          <>
            <div className="section-card2">
              <div className="task-input">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task"
                />
                <button onClick={addTask}>Add</button>
              </div>
            </div>

{tasks.length > 0 && (
  <div className="section-card">
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={task._id} className={`task ${task.status}`}>
          <span>{index + 1}. {task.title}</span>

          <div className="task-actions">
            <button onClick={() => updateStatus(task, "done")}>
              Completed
            </button>
            <button onClick={() => updateStatus(task, "notdone")}>
              Not Completed
            </button>
            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
)}

          </>
        ) : (
          <div className="section-card">
            <div className="empty-state">
              SELECT A DATE BEFORE ADDING TASK
            </div>
          </div>
        )}
      </div>

      {showAllTasks && (
        <AllTasksModal
          allTasks={allTasks}
          onClose={() => setShowAllTasks(false)}
        />
      )}
    </div>
  );
}

export default TaskPage;
