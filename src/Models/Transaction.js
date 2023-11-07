module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Transaction', {
    transactionId: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    invoiceId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Invoice',
        key: 'invoiceId'
      }
    },
    paymentId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Payment',
        key: 'paymentId'
      }
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Transaction',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'transactionId' }
        ]
      },
      {
        name: 'fk_Transaction_Invoice',
        using: 'BTREE',
        fields: [
          { name: 'invoiceId' }
        ]
      },
      {
        name: 'fk_Transaction_Payment',
        using: 'BTREE',
        fields: [
          { name: 'paymentId' }
        ]
      }
    ]
  })
}
