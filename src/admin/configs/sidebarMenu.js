import {
    FaAward,
    FaBookmark,
    FaDatabase,
    FaHome,
    FaLayerGroup,
    FaList,
    FaPlus,
    FaShoppingBag,
    FaShoppingCart,
    FaTag,
} from "react-icons/fa";

export const sidebarPrimaryMenu = [
    {
        name: "Dashboard",
        path: "/",
        icon: <FaHome />,
        dashboard: false,
    },
    {
        name: "Məhsullar",
        path: "/",
        icon: <FaShoppingCart />,
        dashboard: false,
        permission: 'topicsIndex',
        children: [
            {
                name: "Məhsul siyahısı",
                path: "/products",
                permission: 'topicsIndex',
                icon: <FaList />,
            }
            ,
            {
                name: "Məhsul əlavə et",
                path: "/products/create",
                permission: 'topicsIndex',
                icon: <FaPlus />,
            }
        ]
    },
    {
        name: "Sifarişlər",
        path: "/",
        icon: <FaShoppingBag />,
        dashboard: false,
        permission: 'topicsIndex',
        children: [
            {
                name: "Sifariş siyahısı",
                path: "/orders",
                permission: 'topicsIndex',
                icon: <FaList />,
            }
        ]
    },
    {
        name: "Anbarlar",
        path: "/",
        icon: <FaDatabase />,
        dashboard: false,
        permission: 'topicsIndex',
        children: [
            {
                name: "Anbar siyahısı",
                path: "/storages",
                permission: 'topicsIndex',
                icon: <FaList />,
            },
            {
                name: "Anbar əlavə et",
                path: "/storages/create",
                permission: 'topicsIndex',
                icon: <FaPlus />,
            }
        ]
    },
    {
        name: "Kateqoriyalar",
        path: "/",
        icon: <FaTag />,
        dashboard: false,
        permission: 'topicsIndex',
        children: [
            {
                name: "Kateqoriya siyahısı",
                path: "/categories",
                permission: 'topicsIndex',
                icon: <FaList />,
            },
            {
                name: "Kateqoriya əlavə et",
                path: "/categories/create",
                permission: 'topicsIndex',
                icon: <FaPlus />,
            }
        ]
    },
    {
        name: "Brendlər",
        path: "/",
        icon: <FaAward />,
        dashboard: false,
        permission: 'topicsIndex',
        children: [
            {
                name: "Brend siyahısı",
                path: "/brands",
                permission: 'topicsIndex',
                icon: <FaList />,
            },
            {
                name: "Brend əlavə et",
                path: "/brands/create",
                permission: 'topicsIndex',
                icon: <FaPlus />,
            }
        ]
    },
    {
        name: "Markalar",
        path: "/",
        icon: <FaBookmark />,
        dashboard: false,
        permission: 'topicsIndex',
        children: [
            {
                name: "Marka siyahısı",
                path: "/marks",
                permission: 'topicsIndex',
                icon: <FaList />,
            },
            {
                name: "Marka əlavə et",
                path: "/marks/create",
                permission: 'topicsIndex',
                icon: <FaPlus />,
            }
        ]
    },
    {
        name: "Modellər",
        path: "/",
        icon: <FaLayerGroup />,
        dashboard: false,
        permission: 'topicsIndex',
        children: [
            {
                name: "Model siyahısı",
                path: "/models",
                permission: 'topicsIndex',
                icon: <FaList />,
            },
            {
                name: "Model əlavə et",
                path: "/models/create",
                permission: 'topicsIndex',
                icon: <FaPlus />,
            }
        ]
    },
]
export const sidebarSecondaryMenu = [
    
]
