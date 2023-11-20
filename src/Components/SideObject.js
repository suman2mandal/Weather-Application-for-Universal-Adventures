import React, { useState } from 'react';

const SideObject = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div className="p-4 rounded-xl space-y-4">
            <div className="flex items-center space-x-4">
                <label htmlFor="date" className="text-lg font-medium">Select Date:</label>
                <input
                    type="date"
                    id="date"
                    value={date.toISOString().substr(0,10)}
                    onChange={(e) => setDate(new Date(e.target.value))}
                    className="p-2 border rounded-md"
                />
            </div>

            <ul className="space-y-1 mt-96 bg-amber-500">
                <li className="text-xl">High Temperature</li>
                <li className="text-xl">Low Temperature</li>
                <li className="text-xl">Humidity</li>
                <li className="text-xl">Sunrise Time</li>
                <li className="text-xl">Sunset Time</li>
            </ul>
        </div>
    );
}

export default SideObject;
