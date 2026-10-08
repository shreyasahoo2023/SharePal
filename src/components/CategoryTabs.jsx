import { Camera, Gamepad2, TentTree, TvMinimalPlay } from "lucide-react";

const departments = [
  { name: "Photography", icon: Camera },
  { name: "Gaming", icon: Gamepad2 },
  { name: "Outdoor", icon: TentTree },
  { name: "Entertainment", icon: TvMinimalPlay },
];

function CategoryTabs({ activeDepartment, onSelectDepartment }) {
  return (
    <nav className="department-navigation" id="categories" aria-label="Product departments">
      <div className="department-navigation-inner">
        {departments.map(({ name, icon: Icon }) => (
          <button
            type="button"
            key={name}
            className={activeDepartment === name ? "department-tab active" : "department-tab"}
            aria-pressed={activeDepartment === name}
            onClick={() => onSelectDepartment(name)}
          >
            <Icon size={18} aria-hidden="true" />
            {name}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default CategoryTabs;
