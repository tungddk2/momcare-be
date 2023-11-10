export default function (sequelize, DataTypes) {
  return sequelize.define('HospitalComment', {
    hospitalCommentId: {
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
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Patient',
        key: 'patientId'
      }
    },
    hospitalId: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Hospital',
        key: 'hospitalId'
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
    tableName: 'HospitalComment',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'hospitalCommentId' }
        ]
      },
      {
        name: 'fk_HospitalComment_Patient',
        using: 'BTREE',
        fields: [
          { name: 'patientId' }
        ]
      },
      {
        name: 'fk_HospitalComment_Hospital',
        using: 'BTREE',
        fields: [
          { name: 'hospitalId' }
        ]
      }
    ]
  })
}
