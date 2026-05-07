import SgIcon from "@/admin/components/ui/Icon";

export const sidebarPrimaryMenu = [
    {
        name: "Dashboard",
        path: "/",
        icon: <SgIcon icon='home' />,
        dashboard: false,
    },
    {
        name: "Mövzular",
        path: "/",
        icon: <SgIcon icon='type' />,
        dashboard: true,
        permission: 'topicsIndex',
        children: [
            {
                name: "Mövzu siyahısı",
                path: "/topics",
                permission: 'topicsIndex',
                icon: <SgIcon icon='list' />,
            }
        ]
    },
    {
        name: "Fənnlər",
        path: "/",
        icon: <SgIcon icon='type' />,
        dashboard: true,
        permission: 'subjectsIndex',
        children: [
            {
                name: "Fənnlərin siyahısı",
                path: "/subjects",
                permission: 'subjectsIndex',
                icon: <SgIcon icon='list' />,
            }
        ]
    },
    {
        name: "Elanlar",
        path: "/announcements",
        icon: <SgIcon icon='type' />,
        dashboard: true,
        permission: 'announcementsIndex',
        children: [
            {
                name: "Elanların siyahısı",
                path: "/announcements",
                permission: 'announcementsIndex',
                icon: <SgIcon icon='list' />,
            },
            {
                name: "Elan əlavə et",
                path: "/announcements/create",
                permission: 'announcementsIndex',
                icon: <SgIcon icon='plus' />,
            }
        ]
    },
    {
        name: "FAQ",
        path: "/faq",
        icon: <SgIcon icon='type' />,
        dashboard: true,
        permission: 'announcementsIndex',
        children: [
            {
                name: "FAQ siyahısı",
                path: "/faq",
                permission: 'announcementsIndex',
                icon: <SgIcon icon='list' />,
            },
            {
                name: "FAQ əlavə et",
                path: "/faq/create",
                permission: 'announcementsIndex',
                icon: <SgIcon icon='plus' />,
            }
        ]
    },
    {
        name: "Məktəblər",
        path: "/schools",
        icon: <SgIcon icon='type' />,
        dashboard: true,
        permission: 'schoolsIndex',
    },
    {
        name: "Məktəb sorğuları",
        path: "/schools-survey",
        icon: <SgIcon icon='type' />,
        dashboard: true,
        permission: 'schoolsIndex',
    },
    {
        name: "Əlavə video resurslar",
        path: "/video-content",
        icon: <SgIcon icon='type' />,
        dashboard: true,
        permission: 'videoContentIndex',
    },
    {
        name: "Faydalı keçidlər",
        path: "/useful-links",
        icon: <SgIcon icon='type' />,
        dashboard: true,
        permission: 'staticIndex',
    },
    {
        name: "Statik məlumatlar",
        path: "/static",
        icon: <SgIcon icon='type' />,
        dashboard: true,
        permission: 'staticIndex',
    },
    {
        name: "Statistika",
        path: "/statistics",
        icon: <SgIcon icon='type' />,
        dashboard: true,
        permission: 'statisticsIndex',
        children: [
            {
                name: "Ümumi statistika",
                path: "/statistics",
                permission: 'statisticsIndex',
                icon: <SgIcon icon='list' />,
            },
            {
                name: "İrəliləmə göstəriciləri",
                path: "/progress-statistics",
                // permission: 'progressStatisticsIndex',
                icon: <SgIcon icon='list' />,
            },
            {
                name: "Google analytics",
                path: "https://analytics.google.com/analytics/web/#/p475732383/reports/intelligenthome",
                external: true,
                // permission: 'progressStatisticsIndex',
                icon: <SgIcon icon='list' />,
            }
        ]
    },
    {
        name: "Support",
        path: "/support",
        icon: <SgIcon icon='type' />,
        dashboard: true,
        permission: 'supportIndex',
    }
]
export const sidebarSecondaryMenu = [
    {
        name: "Admin",
        path: "/admin",
        icon: <SgIcon icon='user' />,
        permission: 'adminIndex',
    },
    {
        name: "İstifadəçilər",
        path: "/users",
        icon: <SgIcon icon='users' />,
        permission: 'usersIndex',
    }
]