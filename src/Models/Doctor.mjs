export default function (sequelize, DataTypes) {
  return sequelize.define('Doctor', {
    doctorId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    age: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 18
      }
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    medicalSpecialty: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      default: 0,
      references: {
        model: 'MedicalSpecialty',
        key: 'id'
      }
    },
    hospital: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    degree: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    consultingPriceViaMessage: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      default: 50
    },
    consultingPriceViaCall: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      default: 50
    },
    point: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      default: 0
    }
  }, {
    sequelize,
    tableName: 'Doctor',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'doctorId' }
        ]
      },
      {
        name: 'fk_Doctor_User',
        using: 'BTREE',
        fields: [
          { name: 'doctorId' }
        ]
      },
      {
        name: 'fk_Doctor_MedicalSpecialty',
        using: 'BTREE',
        fields: [
          { name: 'medicalSpecialty' }
        ]
      }
    ]
  })
}
