const paths = {
    PolicyView:         "/policy",
    LoginLayout:        "/login",
    AuthenticationView: "/login/authorization",
    RegistrationView:   "/login/registration",
    LkLayout:           "/lk",
    ProfileView:        "/lk/profile",
    RulesView:          "/lk/rules",
    AboutView:          "/lk/about",
    ClassesView:        "/lk/classes",
    ClassesAddView:     "/lk/classes/add",
    ClassesEditView:    "/lk/classes/edit",
    StorageView:        "/lk/storage",
    StudentsView:       "/lk/students",
    ListEventsView:     "/lk/students/list-events",
    ListStudentsView:   "/lk/students/list-students",
} as const

export default paths
