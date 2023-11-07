export default function (sequelize, DataTypes) {
  return sequelize.define('DoctorComment', {
    doctorCommentId: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    patientId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Patient',
        key: 'patientId'
      }
    },
    doctorId: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Doctor',
        key: 'doctorId'
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    point: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'DoctorComment',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'doctorCommentId' }
        ]
      },
      {
        name: 'fk_DoctorComment_Patient',
        using: 'BTREE',
        fields: [
          { name: 'patientId' }
        ]
      },
      {
        name: 'fk_DoctorComment_Doctor',
        using: 'BTREE',
        fields: [
          { name: 'doctorId' }
        ]
      }
    ]
  })
}
