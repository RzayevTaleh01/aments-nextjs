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
        icon: <SgIcon icon='shopping-cart' />,
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
    {
        name: "Sifarişlər",
        path: "/",
        icon: <SgIcon icon='shopping-bag' />,
        dashboard: false,
        permission: 'topicsIndex',
        children: [
            {
                name: "Sifariş siyahısı",
                path: "/orders",
                permission: 'topicsIndex',
                icon: <SgIcon icon='list' />,
            }
        ]
    },
    {
        name: "Anbarlar",
        path: "/",
        icon: <SgIcon icon='database' />,
        dashboard: false,
        permission: 'topicsIndex',
        children: [
            {
                name: "Anbar siyahısı",
                path: "/storages",
                permission: 'topicsIndex',
                icon: <SgIcon icon='list' />,
            },
            {
                name: "Anbar əlavə et",
                path: "/storages/create",
                permission: 'topicsIndex',
                icon: <SgIcon icon='plus' />,
            }
        ]
    },
    {
        name: "Kateqoriyalar",
        path: "/",
        icon: <SgIcon icon='tag' />,
        dashboard: false,
        permission: 'topicsIndex',
        children: [
            {
                name: "Kateqoriya siyahısı",
                path: "/categories",
                permission: 'topicsIndex',
                icon: <SgIcon icon='list' />,
            },
            {
                name: "Kateqoriya əlavə et",
                path: "/categories/create",
                permission: 'topicsIndex',
                icon: <SgIcon icon='plus' />,
            }
        ]
    },
    {
        name: "Brendlər",
        path: "/",
        icon: <SgIcon icon='award' />,
        dashboard: false,
        permission: 'topicsIndex',
        children: [
            {
                name: "Brend siyahısı",
                path: "/brands",
                permission: 'topicsIndex',
                icon: <SgIcon icon='list' />,
            },
            {
                name: "Brend əlavə et",
                path: "/brands/create",
                permission: 'topicsIndex',
                icon: <SgIcon icon='plus' />,
            }
        ]
    },
    {
        name: "Markalar",
        path: "/",
        icon: <SgIcon icon='bookmark' />,
        dashboard: false,
        permission: 'topicsIndex',
        children: [
            {
                name: "Marka siyahısı",
                path: "/marks",
                permission: 'topicsIndex',
                icon: <SgIcon icon='list' />,
            },
            {
                name: "Marka əlavə et",
                path: "/marks/create",
                permission: 'topicsIndex',
                icon: <SgIcon icon='plus' />,
            }
        ]
    },
    {
        name: "Modellər",
        path: "/",
        icon: <SgIcon icon='layers' />,
        dashboard: false,
        permission: 'topicsIndex',
        children: [
            {
                name: "Model siyahısı",
                path: "/models",
                permission: 'topicsIndex',
                icon: <SgIcon icon='list' />,
            },
            {
                name: "Model əlavə et",
                path: "/models/create",
                permission: 'topicsIndex',
                icon: <SgIcon icon='plus' />,
            }
        ]
    },
]
export const sidebarSecondaryMenu = [
    
]
