import React, { useEffect, useState } from "react";
import AdminTaskList from "../components/AdminTaskList";
import { useHttpClient } from "../../shared/hooks/http-hook";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const TaskGiven = (props) => {
  // const [formState, inputHandler] = useForm(
  //   {
  //     date: {
  //       value: "",
  //       isValid: false,
  //     },
  //     day: {
  //       value: "",
  //       isValid: false,
  //     },
  //     description: {
  //       value: "",
  //       isValid: false,
  //     },
  //   },
  //   false
  // );
  const { error, sendRequest, clearError } = useHttpClient();
  const [loadedTasks, setLoadedTasks] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5001/api/admin/taskGiven"
        );

        setLoadedTasks(responseData.tasks);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  const taskDeletedHandler = (deletedTaskId) => {
    setLoadedTasks((prevTask) =>
      prevTask.filter((task) => task.id !== deletedTaskId)
    );
  };

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />

      {loadedTasks && (
        <AdminTaskList items={loadedTasks} onDeleteTask={taskDeletedHandler} />
      )}
    </div>
    // <form className="leave">
    //   <Input
    //     id="date"
    //     element="input"
    //     type="text"
    //     label="Date"
    //     validators={[VALIDATOR_REQUIRE()]}
    //     onInput={inputHandler}
    //     errorText="Please Enter A Valid Date"
    //   />
    //   <Input
    //     id="day"
    //     element="input"
    //     type="text"
    //     label="No of days"
    //     validators={[VALIDATOR_REQUIRE()]}
    //     onInput={inputHandler}
    //     errorText="Please Enter A Number Of Days"
    //   />
    //   <Input
    //     id="description"
    //     element="textarea"
    //     type="text"
    //     label="Description"
    //     validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
    //     onInput={inputHandler}
    //     errorText="Please Enter A Valid Description"
    //   />
    //   <Button type="submit" disabled={!formState.isValid}>
    //     APPLY
    //   </Button>
    // </form>
  );
};
export default TaskGiven;
