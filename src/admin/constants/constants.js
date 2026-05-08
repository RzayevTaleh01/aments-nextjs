import {globalValidateWithArray} from "@/admin/utils/validate";

const SignInFormValidation = {
    email: {
        presence: true,
        length: { minimum: 2 }
    },
    password: {
        presence: true,
        length: { minimum: 6 }
    },
}
const AnnouncementCreateFormValidation = {
    title: {
        presence: true,
        length: { minimum: 2 }
    },
    description: {
        presence: true,
        length: { minimum: 6 }
    },
}
const UsefullLinkCreateFormValidation = {
    name: {
        presence: true,
        length: { minimum: 2 }
    },
    url: {
        presence: true,
        length: { minimum: 6 }
    },
}
const VideoCategoryCreateFormValidation = {
    name: {
        presence: true,
    },
    row: {
        presence: true,
        numericality: {
            onlyInteger: true,
            greaterThanOrEqualTo: 1
        }
    },
    color: {
        presence: true,
    },
    backgroundColor: {
        presence: true,
    },
}
const StaticCategoryCreateFormValidation = {
    name: {
        presence: true,
    }
}
const ProductCreateFormValidation = {
    name: {
        presence: true,
        length: { minimum: 2 }
    }
}
const FaqCreateFormValidation = {
    question: {
        presence: true,
    },
    row: {
        presence: true,
        numericality: {
            onlyInteger: true,
            greaterThanOrEqualTo: 1
        }
    },
    answer: {
        presence: true,
    },
}
const TaskFormValidation = {
    tasks: {
        custom: function custom(tasks) {
            if (tasks && Array.isArray(tasks) && tasks.length > 0) {
                return globalValidateWithArray(tasks, {
                    text: {
                        presence: true,
                        length: { minimum: 2 }
                    }
                }, "questions");
            } else {
                return null;
            }
        }
    }
}
const LessonCreateFormValidation = {
    name: {
        presence: true,
        length: { minimum: 2 }
    },
    summary: {
        presence: true,
        length: { minimum: 2 }
    },
    // videoUrl: {
    //     presence: true,
    //     length: { minimum: 2 }
    // },
    // taskVideoUrl: {
    //     presence: true,
    //     length: { minimum: 2 }
    // },
    epubId: {
        presence: true,
    },
    epubPage: {
        presence: true,
        numericality: {
            onlyInteger: true,
        }
    },
    endDate: {
        presence: true,
        length: { minimum: 2 }
    }
}
const UserCreateFormValidation = {
    name: {
        presence: true,
        length: { minimum: 2 }
    },
    surname: {
        presence: true,
        length: { minimum: 2 }
    },
    email: {
        presence: true,
        length: { minimum: 2 }
    },
    phone: {
        presence: true,
        length: { minimum: 2 }
    },
    roleId: {
        presence: true
    },
    password: {
        presence: true,
        length: {
            minimum: 12,
            message: "Şifrənin uzunluğu: Ən azı 12 simvol və ya daha çox olmalıdır",
        },
        format: {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/,
            message: "Şifrələrdə ən azı bir böyük hərf, bir kiçik hərf, bir rəqəm və bir xüsusi simvol olmalıdır",
        }
    },
    repeatPassword: {
        presence: true,
        equality: "password"
    },
    pinCheck: {
        custom: function custom(finCheck) {
            if (!finCheck) {
                return { errors: { pinCheck: 'blank' } }
            } else {
                return null;
            }
        }
    }
    /*status: {
        presence: true
    },
    isSuperAdmin: {
        presence: true
    },
    isDevelopmentStaff: {
        presence: true
    },*/
}
const UserEditFormValidation = {
    name: {
        presence: true,
        length: { minimum: 2 }
    },
    surname: {
        presence: true,
        length: { minimum: 2 }
    },
    email: {
        presence: true,
        length: { minimum: 2 }
    },
    phone: {
        presence: true,
        length: { minimum: 2 }
    },
    roleId: {
        presence: true
    },
    /*status: {
        presence: true
    },
    isSuperAdmin: {
        presence: true
    },
    isDevelopmentStaff: {
        presence: true
    },*/
}
const FinCheckFormValidation = {
    finCode: {
        presence: true,
        length: { minimum: 2 }
    },
    birthDate: {
        presence: true,
    },

}

export const validationConstraints = (data, type) => {
    if (type === 'sign-in') {
        return {
            ...SignInFormValidation,
        };
    }
    if (type === 'taskCreate') {
        return {
            ...TaskFormValidation,
        };
    }
    if (type === 'lessonCreate') {
        return {
            ...LessonCreateFormValidation,
        };
    }
    if (type === 'announcementCreate') {
        return {
            ...AnnouncementCreateFormValidation,
        };
    }
    if (type === 'usefulLinkCreate') {
        return {
            ...UsefullLinkCreateFormValidation,
        };
    }
    if (type === 'productCreate') {
        return {
            ...ProductCreateFormValidation,
        };
    }
    if (type === 'videoCategoryCreate') {
        return {
            ...VideoCategoryCreateFormValidation,
        };
    }
    if (type === 'staticCategoryCreate') {
        return {
            ...StaticCategoryCreateFormValidation,
        };
    }
    if (type === 'faqCreate') {
        return {
            ...FaqCreateFormValidation,
        };
    }
    if (type === 'userEdit') {
        return {
            ...UserEditFormValidation,
        };
    }
    if (type === 'finCheck') {
        return {
            ...FinCheckFormValidation,
        };
    }
    if (type === 'userCreate') {
        return {
            ...FinCheckFormValidation,
            ...UserCreateFormValidation,
        };
    }
}
