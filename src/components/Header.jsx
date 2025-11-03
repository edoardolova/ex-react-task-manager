import { NavLink } from "react-router-dom";

export default function Header() {
  const links = [
    { to: "/", text: "Tasks" },
    { to: "/add-task", text: "Aggiungi task" }
  ];

  return (
    <div className="d-flex bg-dark py-3 justify-content-center">
      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `fs-4 me-4 ${isActive ? "text-warning" : "text-light"}`
          }
        >
          {link.text}
        </NavLink>
      ))}
    </div>
  );
}
