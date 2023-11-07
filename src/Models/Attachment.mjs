export default function (sequelize, DataTypes) {
  return sequelize.define(
    'Attachment',
    {
      attachmentId: {
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
      file: {
        type: DataTypes.STRING(500),
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
    },
    {
      sequelize,
      tableName: 'Attachment',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'attachmentId' }]
        },
        {
          name: 'fk_Attachment_Conversation',
          using: 'BTREE',
          fields: [{ name: 'conversationId' }]
        }
      ]
    }
  )
}
