export default function (sequelize, DataTypes) {
  return sequelize.define('Call', {
    callId: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    callAppointmentId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'CallAppointment',
        key: 'callAppointmentId'
      }
    },
    problems: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Call',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'callId' }
        ]
      },
      {
        name: 'fk_Call_CallAppointment',
        using: 'BTREE',
        fields: [
          { name: 'callAppointmentId' }
        ]
      }
    ]
  })
}
