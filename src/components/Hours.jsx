import hourService from "../services/hourService";
import { useDispatch, useSelector} from "react-redux";
import { setHours } from "../reducers/hourReducer";

const Hours = () => {
  const dispatch = useDispatch();
  const hours = useSelector(state => state.hours)

  const deleteHour = (id) => {
      hourService.deleteHour(id).then((hours) => {
        hours && dispatch(setHours(hours));
      });
  };

  return (
    <>
      <h2 className="text-xl font-bold">Log</h2>
      <div className="my-4">
        {hours.map((hour) => {
          const { id, date, input, output } = hour;
          return (
            <div key={id} className="flex">
              <div>
                {`${new Date(date).toDateString()} - ${input} to ${output}`}
              </div>
              <div
                className="cursor-pointer mx-4"
                onClick={() => deleteHour(id)}
              >
                X
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Hours;
