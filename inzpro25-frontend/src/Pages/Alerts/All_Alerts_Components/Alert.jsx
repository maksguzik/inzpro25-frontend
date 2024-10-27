import { useEffect, useRef, useState } from "react";
import "../Alerts.css";
import AlertItem from "./Components/AlertItem";
import DeleteAlert from "./Components/DeleteAlert";

function Alert({ id, name, email, isActive, setUpdateAlertsList, setDeleteAlertList, setAlertsList }) {
  const [hover, setHover] = useState(false);
  const [selected, setSelected] = useState(false);

  const rowRef = useRef(null);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  const handleClick = () => {
    setSelected((prevSelected) => {
      const newSelected = !prevSelected;

      if (newSelected) {
        setDeleteAlertList((prevList) => [...prevList, id]);
      } else {
        setDeleteAlertList((prevList) =>
          prevList.filter((element) => element !== id)
        );
      }

      return newSelected;
    });
  };

  useEffect(() => {
    const row = rowRef.current;
    if (row) {
      row.addEventListener("mouseenter", handleMouseEnter);
      row.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (row) {
        row.removeEventListener("mouseenter", handleMouseEnter);
        row.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [rowRef]);

  return (
    <tr
      className={selected ? "deviceToken selected" : "deviceToken"}
      ref={rowRef}
      onClick={() => {
        handleClick();
      }}
    >
      <AlertItem id={id} name={name} email={email} isActive={isActive} />
    </tr>
  );
}

export default Alert;
