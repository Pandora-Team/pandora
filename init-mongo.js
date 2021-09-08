db.createUser(
    {
        user: "admin",
        pwd: "1qaz2wsx",
        roles: [
            {
                role: "readWrite",
                db: "pandora"
            }
        ]
    }
)