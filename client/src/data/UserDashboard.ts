import { RiArticleLine, RiDashboardHorizontalLine, RiEraserLine, RiFileEditLine, RiGroupLine, RiImageLine, RiLogoutBoxRLine, RiScissorsLine } from "@remixicon/react";

export const UserDashboard = [
    {
        item: 'Dashboard',
        component: 'Dashboard',
        icon: RiDashboardHorizontalLine,
    },
    {
        item: 'Write Article',
        component: 'WriteArticle',
        icon: RiFileEditLine,
    },
    {
        item: 'Generate Image',
        component: 'GenerateImages',
        icon: RiImageLine,
    },
    {
        item: 'Remove Background',
        component: 'RemoveBackground',
        icon: RiEraserLine,
    },
    {
        item: 'Remove Object',
        component: 'RemoveObject',
        icon: RiScissorsLine,
    },
    {
        item: 'Review Resume',
        component: 'ReviewResume',
        icon: RiArticleLine,
    },
    {
        item: 'Community',
        component: 'Community',
        icon: RiGroupLine,
    },
    {
        item: 'Logout',
        component: 'Logout',
        icon: RiLogoutBoxRLine,
    },
]