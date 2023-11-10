export default function (sequelize, DataTypes) {
  return sequelize.define('MedicalRecord', {
    medicalRecordId: {
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
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    medicalHistoryId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'MedicalHistory',
        key: 'medicalHistoryId'
      }
    },
    diagnostic: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'MedicalRecord',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'medicalRecordId' }
        ]
      },
      {
        name: 'fk_MedicalRecord_Patient',
        using: 'BTREE',
        fields: [
          { name: 'patientId' }
        ]
      },
      {
        name: 'fk_MedicalRecord_Doctor',
        using: 'BTREE',
        fields: [
          { name: 'doctorId' }
        ]
      },
      {
        name: 'fk_MedicalRecord_MedicalHistory',
        using: 'BTREE',
        fields: [
          { name: 'medicalHistoryId' }
        ]
      }
    ]
  })
}
