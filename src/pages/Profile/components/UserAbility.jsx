import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  PointElement,
  RadialLinearScale,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function UserAbility({ ability }) {
  const options = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 10,
        suggestedMax: 100,
        ticks: {
          backdropColor: 'transparent',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full bg-cardBackground shadow-md rounded-lg p-4 pb-4">
      <h2 className="font-bold mb-4 ">능력치</h2>
      <div className="w-full">
        <Radar data={ability} options={options} />
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span>Left Foot: 5</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
          <span>Right Foot: 5</span>
        </div>
      </div>
    </div>
  );
}
