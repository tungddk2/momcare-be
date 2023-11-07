module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Prescription', {
    prescriptionId: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    medicalRecordId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'MedicalRecord',
        key: 'medicalRecordId'
      }
    },
    medicinesNameAndDosages: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    usageTime: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Prescription',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'prescriptionId' }
        ]
      },
      {
        name: 'fk_Prescription_MedicalRecord',
        using: 'BTREE',
        fields: [
          { name: 'medicalRecordId' }
        ]
      }
    ]
  })
}
