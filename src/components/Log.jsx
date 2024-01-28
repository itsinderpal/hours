
const Log = ({hours, setHours, deleteHour}) => {

    return (
        <>
            <h2 className="text-xl font-bold">Log</h2>
            <div className="my-4">
            {hours.map(hour => {
                const {id, date, input, output} = hour;
                return <div key={id} className="flex">
                    <div>
                    {`${new Date(date).toDateString()} - ${input} to ${output}`}
                    </div>
                    <div className="cursor-pointer mx-4" onClick={() => deleteHour(id)}>
                        X
                    </div>
                </div>
            })}
            </div>
        </>
    )
}

export default Log;