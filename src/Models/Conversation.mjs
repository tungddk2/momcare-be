export default function (sequelize, DataTypes) {
  return sequelize.define('Conversation', {
    conversationId: {
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
    doctorId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Doctor',
        key: 'doctorId'
      }
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(128),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Conversation',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'conversationId' }
        ]
      },
      {
        name: 'fk_Conversation_Patient',
        using: 'BTREE',
        fields: [
          { name: 'patientId' }
        ]
      },
      {
        name: 'fk_Conversation_Doctor',
        using: 'BTREE',
        fields: [
          { name: 'doctorId' }
        ]
      }
    ]
  })
}
