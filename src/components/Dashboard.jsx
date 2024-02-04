import { useState } from "react";
import Hours from "./Hours";
import DatePicker from "./DatePicker";
import DisplayUser from "./DisplayUser";
import hourService from "../services/hourService";
import { useDispatch } from "react-redux";
import { setHours } from "../reducers/hourReducer";

const Dashboard = ({user}) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));

  const initTimeFormat = new Date().toLocaleTimeString("en-CA", {
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  });
  const [time, setTime] = useState({
    input: initTimeFormat,
    output: initTimeFormat,
  });

  const hour = { date, ...time };

  const handleSave = () => {
    hourService.addHour(hour).then((hours) => {
      hours && dispatch(setHours(hours));
    });
  };

  return (
    <>
        <DisplayUser user={user} />
      <div className="my-8 flex flex-col items-center">
        <DatePicker date={date} setDate={setDate} />
        <div className="space-y-4">
          <div>
            <label htmlFor="inputTime">Input: </label>
            <input
              type="time"
              name="input"
              id="inputTime"
              value={time.input}
              className="px-1 rounded-md text-center"
              onChange={(e) => setTime({ ...time, input: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="outputTime">Output: </label>
            <input
              type="time"
              name="input"
              id="outputTime"
              value={time.output}
              className="px-1 rounded-md text-center"
              onChange={(e) => setTime({ ...time, output: e.target.value })}
            />
          </div>
        </div>
        <button onClick={handleSave} className="my-4">
          Save
        </button>
      </div>
      <Hours />
    </>
  );
};

export default Dashboard;
