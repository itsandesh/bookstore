const AppConstants = {
    JWT_SECRET: "Admin123",
    SMTP: {
        HOST: "sandbox.smtp.mailtrap.io",
        PORT: 587,
        USER: "a18808256e80f3",
        PASSWORD: "1917d83c6ec402"
    },
    DATABASE: {
        DB_URL: "mongodb://127.0.0.1:27017",
        DB_NAME: "bookstore"
    }
}

module.exports = AppConstants;