import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import DeviceStatusOverviewComponent from "./SummaryRaportsComponents/DeviceStatusOverview/DeviceStatusOverviewComponent";
import './SummaryRaportsPageStyles.css';
import DeviceState from "./SummaryRaportsComponents/DeviceStatusOverview/DeviceStatusOverviewComponent";


ChartJS.register(ArcElement, Tooltip, Legend);

function SummaryRaportsPage() {
  return (
    <div className="gridContainer">
      <div className="gridItem">
        <DeviceState />
      </div>
      <div className="gridItem">procent niezwodnosci przypietych urzadzen
      </div>
      <div className="gridItem"></div>
      <div className="gridItem"></div>
    </div>
  );
}

export default SummaryRaportsPage;
