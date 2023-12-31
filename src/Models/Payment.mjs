export default function (sequelize, DataTypes) {
  return sequelize.define('Payment', {
    paymentId: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    patientId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Patient',
        key: 'patientId'
      }
    },
    amount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    paymentTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.STRING(128),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Payment',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'paymentId' }
        ]
      },
      {
        name: 'fk_Payment_Patient',
        using: 'BTREE',
        fields: [
          { name: 'patientId' }
        ]
      }
    ]
  })
}
