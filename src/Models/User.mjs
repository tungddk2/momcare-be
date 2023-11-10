export default function (sequelize, DataTypes) {
  return sequelize.define('User', {
    userId: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    googleId: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'User',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'userId' }
        ]
      }
    ]
  })
}
