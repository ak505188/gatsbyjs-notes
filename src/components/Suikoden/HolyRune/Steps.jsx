import React from 'react';

const Steps = ({ steps, setSteps }) => {
  const possible_steps = [0, 1, 2, 3];

  return (
    <div className="steps">
      Step Count:&nbsp;
      {possible_steps.map(step_count => (
        <span key={step_count}>
          <label>{step_count}</label>
          <input
            type="radio"
            value={step_count}
            name="step-count"
            checked={steps === step_count}
            onClick={() => setSteps(step_count)}
          />
        </span>
      ))}
    </div>
  )
}

export default Steps;
