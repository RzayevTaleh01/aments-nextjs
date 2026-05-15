export const supportsData = [
    {
        id: 1,
        row: 1,
        name: "IAMAS",
        key: "iamas",
        description: "IAMAS data with pin and birthday",
        api: {
            url: "/admin/support/midapi/ia",
            method: "POST",
            headers: {},
            data: [
                {
                    name: "FİN",
                    key: "pin",
                    type: "text",
                    defaultValue: ""
                },
                {
                    name: "Doğum tarixi",
                    key: "birthDate",
                    type: "date",
                    defaultValue: ""
                }
            ]
        }
    },
    {
        id: 2,
        row: 2,
        name: "IAMAS, only pin",
        key: "iamas-only-pin",
        description: "IAMAS, only pin",
        api: {
            url: "/admin/support/midapi/iaf",
            method: "POST",
            headers: {},
            data: [
                {
                    name: "FİN",
                    key: "pin",
                    type: "text",
                    defaultValue: ""
                }
            ]
        }
    },
    {
        id: 3,
        row: 3,
        name: "Ədliyyə",
        key: "justice",
        description: "Ədliyyə",
        api: {
            url: "/admin/support/midapi/edl",
            method: "POST",
            headers: {},
            data: [
                {
                    name: "FİN",
                    key: "pin",
                    type: "text",
                    defaultValue: ""
                }
            ]
        }
    },
    {
        id: 4,
        row: 4,
        name: "Miqrasiya",
        key: "migration",
        description: "Miqrasiya",
        api: {
            url: "/admin/support/midapi/miq",
            method: "POST",
            headers: {},
            data: [
                {
                    name: "FİN",
                    key: "pin",
                    type: "text",
                    defaultValue: ""
                }
            ]
        }
    },
    {
        id: 5,
        row: 5,
        name: "UTIS children",
        key: "utis-children",
        description: "UTIS parent children",
        api: {
            url: "/admin/support/utis/parent-children",
            method: "POST",
            headers: {},
            data: [
                {
                    name: "FİN",
                    key: "pin",
                    type: "text",
                    defaultValue: ""
                }
            ]
        }
    },
    {
        id: 6,
        row: 6,
        name: "UTIS student",
        key: "utis-student",
        description: "UTIS student",
        api: {
            url: "/admin/support/utis/student",
            method: "POST",
            headers: {},
            data: [
                {
                    name: "FİN",
                    key: "pin",
                    type: "text",
                    defaultValue: ""
                }
            ]
        }
    },
    {
        id: 7,
        row: 7,
        name: "UTIS teacher",
        key: "utis-teacher",
        description: "UTIS teacher",
        api: {
            url: "/admin/support/utis/teacher",
            method: "POST",
            headers: {},
            data: [
                {
                    name: "FİN",
                    key: "pin",
                    type: "text",
                    defaultValue: ""
                }
            ]
        }
    },
    {
        id: 8,
        row: 8,
        name: "UTIS director",
        key: "utis-director",
        description: "UTIS director",
        api: {
            url: "/admin/support/utis/director",
            method: "POST",
            headers: {},
            data: [
                {
                    name: "FİN",
                    key: "pin",
                    type: "text",
                    defaultValue: ""
                }
            ]
        }
    },
    {
        id: 9,
        row: 9,
        name: "Jurnal exams",
        key: "jurnal-exams",
        description: "Jurnal exams",
        api: {
            url: "/admin/support/jurnal/exams",
            method: "POST",
            headers: {},
            data: [
                {
                    name: "UTIS code",
                    key: "utisCode",
                    type: "text",
                    defaultValue: ""
                }
            ]
        }
    },
    {
        id: 10,
        row: 10,
        name: "Jurnal schedules",
        key: "jurnal-schedules",
        description: "Jurnal schedules",
        api: {
            url: "/admin/support/jurnal/schedules",
            method: "POST",
            headers: {},
            data: [
                {
                    name: "UTIS code",
                    key: "utisCode",
                    type: "text",
                    defaultValue: ""
                },
                {
                    name: "Başlama tarixi",
                    key: "from",
                    type: "date",
                    defaultValue: ""
                },
                {
                    name: "Bitmə tarixi",
                    key: "to",
                    type: "date",
                    defaultValue: ""
                }
            ]
        }
    }
]