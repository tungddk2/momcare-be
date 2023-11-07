module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Message', {
    messageId: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    conversationId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Conversation',
        key: 'conversationId'
      }
    },
    sender: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(128),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Message',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'messageId' }
        ]
      },
      {
        name: 'fk_Message_Conversation',
        using: 'BTREE',
        fields: [
          { name: 'conversationId' }
        ]
      }
    ]
  })
}
