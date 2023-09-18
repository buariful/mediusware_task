import React, { useEffect, useState } from "react";

const Problem1 = () => {
  const [tasks, setTasks] = useState([]);
  const [serializeTasks, setSerializeTasks] = useState([]);
  const [show, setShow] = useState("all");

  const handleClick = (val) => {
    setShow(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, status } = e.target;
    setTasks([...tasks, { name: name.value, status: status.value }]);
    e.target.reset();
  };

  function showAllTask() {
    const active_tasks = [];
    const completed_tasks = [];
    const other = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].status.toLowerCase() === "active") {
        active_tasks.push(tasks[i]);
      } else if (tasks[i].status.toLowerCase() === "completed") {
        completed_tasks.push(tasks[i]);
      } else {
        other.push(tasks[i]);
      }
    }
    setSerializeTasks([...active_tasks, ...completed_tasks, ...other]);
  }

  function showActiveTasks() {
    const activeTasks = tasks.filter(
      (task) => task.status.toLowerCase() === "active"
    );
    setSerializeTasks(activeTasks);
  }
  function showCompletedTasksTasks() {
    const completedTasks = tasks.filter(
      (task) => task.status.toLowerCase() === "completed"
    );
    setSerializeTasks(completedTasks);
  }

  useEffect(() => {
    if (show.toLocaleLowerCase() === "active") {
      showActiveTasks();
    }
    if (show.toLocaleLowerCase() === "completed") {
      showCompletedTasksTasks();
    }
    if (show.toLocaleLowerCase() === "all") {
      showAllTask();
    }
  }, [tasks, show]);

  const allTasks = serializeTasks.map((task, i) => (
    <tr key={i + task?.name}>
      <td>{task?.name}</td>
      <td>{task?.status}</td>
    </tr>
  ));
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                name="status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
              {allTasks}
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
