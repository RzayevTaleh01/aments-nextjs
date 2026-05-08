import SgIcon from "@/admin/components/ui/Icon";

export const sidebarPrimaryMenu = [
    {
        name: "Dashboard",
        path: "/",
        icon: <SgIcon icon='home' />,
        dashboard: false,
    },
    {
        name: "Məhsullar",
        path: "/",
        icon: <SgIcon icon='type' />,
        dashboard: false,
        permission: 'topicsIndex',
        children: [
            {
                name: "Məhsul siyahısı",
                path: "/products",
                permission: 'topicsIndex',
                icon: <SgIcon icon='list' />,
            }
            ,
            {
                name: "Məhsul əlavə et",
                path: "/products/create",
                permission: 'topicsIndex',
                icon: <SgIcon icon='plus' />,
            }
        ]
    },
]
export const sidebarSecondaryMenu = [
    
]
