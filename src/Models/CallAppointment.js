module.exports = function (sequelize, DataTypes) {
  return sequelize.define('CallAppointment', {
    callAppointmentId: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    form: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    doctorId: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Doctor',
        key: 'doctorId'
      }
    },
    patientId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Patient',
        key: 'patientId'
      }
    },
    state: {
      type: DataTypes.STRING(128),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'CallAppointment',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'callAppointmentId' }
        ]
      },
      {
        name: 'fk_CallAppointment_Patient',
        using: 'BTREE',
        fields: [
          { name: 'patientId' }
        ]
      },
      {
        name: 'fk_CallAppointment_Doctor',
        using: 'BTREE',
        fields: [
          { name: 'doctorId' }
        ]
      }
    ]
  })
}
