import type { RemixiconComponentType } from "@remixicon/react";
import { useSnapshot } from "valtio";
import state from "../../../store";

type Links = {
    item: string;
    component: string;
    icon?: RemixiconComponentType;
};

type Props = {
    links: Links[];
};

const DashboardSidebar = ({ links }: Props) => {
  const snap = useSnapshot(state);

  return (
    <div className="dashboard-sidebar-menu">
      <ul>
        {links.map((link, index) => (
            <li
              key={index}
              className={`${
                snap.dashboardSelected === link.component ? 'active' : ''
              }`}
            >
                <a onClick={() => (state.dashboardSelected = link.component)}>
                    {link.icon && <link.icon />}
                    <h6>{link.item}</h6>
                </a>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardSidebar;
