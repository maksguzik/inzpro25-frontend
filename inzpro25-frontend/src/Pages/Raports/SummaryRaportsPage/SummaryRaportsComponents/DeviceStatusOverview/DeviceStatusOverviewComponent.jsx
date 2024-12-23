import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './DeviceStatusOverviewStyle.css'

ChartJS.register(ArcElement, Tooltip, Legend);

function DeviceStatusOverviewComponent(){
    const devices = Array.from({ length: 10 }, (_, i) => ({
        deviceId: i + 1,
        down: i % 3 === 0,
        alarm: false,
      }));

    const activeDevices = devices.filter((device) => !device.down).length;
    const inactiveDevices = devices.filter((device) => device.down).length;

    const data = {
        labels: ['Active Devices', 'Inactive Devices'],
        datasets: [
          {
            label: '# of Devices',
            data: [activeDevices, inactiveDevices],
            backgroundColor: ['green', 'red'], 
            borderColor: ['#ffffff', '#ffffff'],
            borderWidth: 1,
          },
        ],
      };

    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      };

      return (
        <div>
          <h3 className="header-style">Device Status Overview</h3>
          <Pie className="pie-chart" data={data} options={options} />
        </div>
      );
}

export default DeviceStatusOverviewComponent;