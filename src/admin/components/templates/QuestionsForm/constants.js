import {globalValidateWithArray} from "@/admin/utils/validate";

const QuestionValidation = {
    questions: {
        custom: function custom(questions) {
            if (questions && Array.isArray(questions) && questions.length > 0) {
                return globalValidateWithArray(questions, {
                    questionText: {
                        custom: function custom(questionText, data) {
                            if (data.variant !== 'section' && (!questionText || questionText === '')) {
                                return { errors: { questionText: 'blank' } }
                            }
                            else {
                                return null;
                            }
                        }
                    },
                    typeId: {
                        custom: function custom(typeId, data) {
                            if (data.variant !== 'section' && (!typeId || typeId === '')) {
                                return { errors: { typeId: 'blank' } }
                            }
                            else {
                                return null;
                            }
                        }
                    },
                    info_message: {
                        custom: function custom(info_message, data) {
                            if (data.info && (!info_message || info_message === '')) {
                                return { errors: { info_message: 'blank' } }
                            }
                            else {
                                return null;
                            }
                        }
                    },
                    variants: {
                        custom: function custom(answers, data) {
                            if (['select', 'radio', 'checkbox'].includes(data.question_type) && (answers && Array.isArray(answers) && answers.length > 0)) {
                                return globalValidateWithArray(answers, {
                                    answer: {
                                        presence: true,
                                        length: { minimum: 1 }
                                    }
                                }, "variants");
                            } else {
                                return null;
                            }
                        }
                    }
                }, "questions");
            } else {
                return null;
            }
        }
    }
}


export const validationConstraints = (type) => {
    if (type === 'submit'){
        return {
            ...QuestionValidation
        };
    }
}

export default validationConstraints;