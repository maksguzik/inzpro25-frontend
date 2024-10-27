function AlertItem({ id, name, email, isActive }) {
  // id: 1, name: 'Test Alert 1', email: 'alert1@example.com', is_active: true

  return (
    <>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{isActive ? "Active" : "Offline"}</td>
    </>
  );
}

export default AlertItem;
