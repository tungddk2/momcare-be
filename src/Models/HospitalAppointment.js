const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HospitalAppointment', {
    hospitalAppointmentId: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    hospitalId: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Hospital',
        key: 'hospitalId'
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
    tableName: 'HospitalAppointment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "hospitalAppointmentId" },
        ]
      },
      {
        name: "fk_HospitalAppointment_Hospital",
        using: "BTREE",
        fields: [
          { name: "hospitalId" },
        ]
      },
      {
        name: "fk_HospitalAppointment_Patient",
        using: "BTREE",
        fields: [
          { name: "patientId" },
        ]
      },
    ]
  });
};
