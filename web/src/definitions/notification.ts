const notification = {
    successAuth:          { text: "Вы успешно авторизованы", type: "success" },
    failedAuth:           { text: "Авторизация не пройдена", type: "failed" },
    successReg:           { text: "Вы успешно зарегистрированы", type: "success" },
    failedReg:            { text: "Регистрация не пройдена", type: "failed" },
    successCreate:        { text: "Вы успешно создали занятие", type: "success" },
    failedCreate:         { text: "Создать занятие не получилось", type: "failed" },
    successRecord:        { text: "Вы успешно записались на занятие", type: "success" },
    failedRecord:         { text: "Записаться на занятие не получилось", type: "failed" },
    successRemove:        { text: "Вы успешно удалили занятие", type: "success" },
    failedRemove:         { text: "Удалить занятие не получилось", type: "failed" },
    successCancel:        { text: "Вы успешно отменили запись", type: "success" },
    failedCancel:         { text: "Отменить запись не получилось", type: "failed" },
    successProfileUpdate: { text: "Вы успешно обновили профиль", type: "success" },
    failedProfileUpdate:  { text: "Обновить профиль не получилось", type: "failed" },
    successAvatarUpdate:  { text: "Вы успешно обновили фото профиля", type: "success" },
    failedAvatarUpdate:   { text: "Обновить фото профиля не получилось", type: "failed" },
    error:                { text: "Ошибка сервера", type: "failed" },
} as const

export default notification