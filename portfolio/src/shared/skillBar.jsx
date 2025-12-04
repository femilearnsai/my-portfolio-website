import React, { useEffect, useState } from 'react'
function SkillBar({ skill }) {
    const [width, setWidth] = useState(0)
    useEffect(() => { setTimeout(() => setWidth(skill.level), 150) }, [skill.level])
    return (
        <div>
            <div className="flex justify-between text-sm"><div>{skill.name}</div><div>{skill.level}%</div></div>
            <div className="w-full bg-gray-200 rounded h-3 mt-2 overflow-hidden">
                <div className="h-3 rounded" style={{ width: `${width}%`, transition: 'width 800ms ease', background: 'linear-gradient(90deg,#0f172a,#334155)' }} />
            </div>
        </div>
    )
}
export default SkillBar