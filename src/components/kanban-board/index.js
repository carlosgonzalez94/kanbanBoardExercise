import React, { useState , useEffect} from "react";
import "./index.css";

export const KanbanBoard = (props) => {
  let stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  let tasks = props.tasks;
  const [stagesTasks, setStagesTasks] = useState([]);
  const updateStages = () => {
    const tempStagesNames = [];
    for (let i = 0; i < stagesNames.length; ++i) {
      tempStagesNames.push([]);
    }

    for (let task of tasks) {
      const stageId = task.stage;
      tempStagesNames[stageId].push(task);
    }

    setStagesTasks(tempStagesNames);
  }

  useEffect(() => {
    updateStages();
  }, []);

  const tempTasks = [];

  const changeStage = (task, rightStage) => {
    if(rightStage) {
      if(task.stage < 3) {
        task.stage++;
      }
    } else {
      if(task.stage > 0) {
        task.stage--;
      }
    }
    for (let i = 0; i < tasks.length; i++) {
      if(tasks[i].name === task.name){
        tempTasks.push(task);
      } else {
        tempTasks.push(tasks[i]);
      }
    }
    tasks = tempTasks;

    updateStages();
  }

  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
              return (
                  <div className="card outlined ml-20 mt-0" key={`${i}`}>
                      <div className="card-text">
                          <h4>{stagesNames[i]}</h4>
                          <ul className="styled mt-50" data-testid={`stage-${i}`}>
                              {tasks.map((task, index) => {
                                  return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                    <div className="li-content layout-row justify-content-between align-items-center">
                                      <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                                      <div className="icons">
                                        <button className="icon-only x-small mx-2"
                                          data-testid={`${task.name.split(' ').join('-')}-back`}
                                          onClick={() => changeStage(task, false)}
                                          disabled={task.stage === 0}
                                        >
                                          <i className="material-icons">arrow_back</i>
                                        </button>
                                        <button
                                          className="icon-only x-small mx-2"
                                          data-testid={`${task.name.split(' ').join('-')}-forward`}
                                          onClick={() => changeStage(task, true)}
                                          disabled={task.stage === 3}
                                        >
                                          <i className="material-icons">arrow_forward</i>
                                        </button>
                                      </div>
                                    </div>
                                  </li>
                              })}
                          </ul>
                      </div>
                  </div>
              )
          })}
      </div>
    </div>
  );
}