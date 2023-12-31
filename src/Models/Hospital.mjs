export default function (sequelize, DataTypes) {
  return sequelize.define('Hospital', {
    hospitalId: {
      autoIncrement: true,
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    workingTime: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    point: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      default: 0
    },
    commentary: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Hospital',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'hospitalId' }
        ]
      }
    ]
  })
}
