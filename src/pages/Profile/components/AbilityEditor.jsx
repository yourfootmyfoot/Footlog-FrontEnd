import { useState } from 'react';
import Slider from './Slider';

export default function AbilityEditor({ ability, onSave, onCancel }) {

  const {labels, datasets: [{data}]} = ability;

  // 데이터가 있는 경우 첫 
  const initialAbilities = labels.reduce((acc, label, index) => {
    console.log(label, data[index])
    acc[label] = data[index];
    return acc;
  }, {});

  const [editedAbilities, setEditedAbilities] = useState({ ...initialAbilities });

  const handleSliderChange = (e, label) => {
    const newValue = parseInt(e.target.value); 
    setEditedAbilities({
      ...editedAbilities,
      [label]: newValue, 
    });
  };

  const handleSave = () => {
    const newData = labels.map((label) => editedAbilities[label]);

    const updatedAbility = {
      ...ability,
      datasets: [
        {
          ...ability.datasets[0],
          data: newData,
        },
      ],
    };

    onSave(updatedAbility);
  };

  return (
    <div className="p-4">
      <h2 className="font-bold mb-4">능력치 수정</h2>
      {labels.map((label) => (
        <Slider
          key={label}
          label={label}
          value={editedAbilities[label]}
          min={0}
          max={100}
          step={1}
          onChange={(e) => handleSliderChange(e, label)}
        />
      ))}
      <div className="flex justify-end mt-4">
        <button
          className="bg-gray-300 p-2 rounded mr-2"
          onClick={onCancel}
        >
          취소
        </button>
        <button
          className="bg-main text-white p-2 rounded"
          onClick={handleSave}
        >
          저장
        </button>
      </div>
    </div>
  );
}
