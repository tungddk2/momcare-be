const TokenTypes = [
  'Bearer',
  'Google',
]

export default function (sequelize, DataTypes) {
  return sequelize.define('Token', {
    id : {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    token: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...TokenTypes),
      allowNull: false,
      default: TokenTypes[0]
    },
    expires: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    },
  }, {
    sequelize,
    tableName: 'Token',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' }
        ]
      },
    ]
  })
}
