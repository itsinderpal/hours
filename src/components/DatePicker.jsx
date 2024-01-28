import { useState } from "react";

const DatePicker = ({date, setDate}) => {

    // const [dateSelect, setDateSelect] = useState(new Date().toLocaleDateString('en-CA'))
  
    return (
      <>
        <div className='flex space-x-4 my-4'>
          <input type="date" className='px-1 rounded-md text-center' value={date} onChange={(e) => setDate(e.target.value)}/>
        </div>
      </>
    )
  
}

export default DatePicker;