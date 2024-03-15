import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      layout container
      <Outlet />
    </div>
  );
}
