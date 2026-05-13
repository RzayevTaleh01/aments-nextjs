import Icon from "@/components/ui/TemplateIcon/TemplateIcon";

export default function SgIcon(props) {
    const { icon, size } = props;

    const map = {
        home: "FaHome",
        "menu-2": "FaBars",
        menu: "FaBars",
        type: "FaRegFileAlt",
        list: "FaList",
        plus: "FaPlus",
        "shopping-cart": "FaShoppingCart",
        "shopping-bag": "FaShoppingBag",
        database: "FaDatabase",
        tag: "FaTag",
        tags: "FaTags",
        award: "FaAward",
        bookmark: "FaBookmark",
        layers: "FaLayerGroup",
        user: "FaUser",
        users: "FaUsers",
        search: "FaSearch",
        close: "FaTimes",
        edit: "FaEdit",
        "edit-2": "FaPen",
        "edit-3": "FaPencilAlt",
        pen: "FaPen",
        trash: "FaTrash",
        "chevrons-left": "FaAngleDoubleLeft",
        "chevrons-right": "FaAngleDoubleRight",
        "arrow-right": "FaArrowRight",
        "arrow-left": "FaArrowLeft",
        "arrow-up": "FaArrowUp",
        "arrow-down": "FaArrowDown",
        "chevron-down": "FaChevronDown",
        "chevron-up": "FaChevronUp",
    };

    const mappedName = map[String(icon || "").trim()] || "FaRegCircle";
    const normalizedSize = typeof size === "string" ? Number(size) : size;

    return icon ? <Icon name={mappedName} size={Number.isFinite(normalizedSize) ? normalizedSize : 18} /> : null;
}
