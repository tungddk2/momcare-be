export const mysqlDB = {
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_NAME: process.env.DB_NAME || 'momcare-be',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '12345678',
  DB_PORT: process.env.DB_PORT || 3306
}

export const PORT = process.env.PORT || 3000