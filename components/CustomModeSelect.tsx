import React from 'react'

type Props = {
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    className?: string,
}

const CustomModeSelect = ({
    name,
    value,
    onChange,
    className,
}:Props) => (
    <label>
        Donation Type (Monthly or One-Time Donation):
        <select className={className} name={name} value={value} onChange={onChange}>
            <option value='subscription'>Monthly</option>
            <option value='payment'>One-Time</option>
        </select>
    </label>
)
export default CustomModeSelect
