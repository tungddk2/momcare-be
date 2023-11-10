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
      allowNull: false
    },
    age: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    medicalSpecialty: {
      type: DataTypes.TEXT,
      allowNull: false
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
      allowNull: false
    },
    consultingPriceViaCall: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    point: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
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
      }
    ]
  })
}
