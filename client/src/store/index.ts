import { proxy } from "valtio";

const state = proxy({
    filterSidebar: false,
    dashboardSelected: 'Dashboard',
});

export default state;