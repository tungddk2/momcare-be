const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Invoice', {
    invoiceId: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    consultingServices: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    callAppointmentId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'CallAppointment',
        key: 'callAppointmentId'
      }
    },
    conversationId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Conversation',
        key: 'conversationId'
      }
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dueTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    totalAmount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(128),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Invoice',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "invoiceId" },
        ]
      },
      {
        name: "fk_Invoice_CallAppointment",
        using: "BTREE",
        fields: [
          { name: "callAppointmentId" },
        ]
      },
      {
        name: "fk_Invoice_Conversation",
        using: "BTREE",
        fields: [
          { name: "conversationId" },
        ]
      },
    ]
  });
};
