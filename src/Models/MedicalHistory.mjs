export default function (sequelize, DataTypes) {
  return sequelize.define('MedicalHistory', {
    medicalHistoryId: {
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
    symptom: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    existingDiseases: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'MedicalHistory',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'medicalHistoryId' }
        ]
      },
      {
        name: 'fk_MedicalHistory_Patient',
        using: 'BTREE',
        fields: [
          { name: 'patientId' }
        ]
      }
    ]
  })
}
