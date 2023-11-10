export default function (sequelize, DataTypes) {
  return sequelize.define('Patient', {
    patientId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    age: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Patient',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'patientId' }
        ]
      },
      {
        name: 'fk_Patient_User',
        using: 'BTREE',
        fields: [
          { name: 'patientId' }
        ]
      }
    ]
  })
}
