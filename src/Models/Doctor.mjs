export default function (sequelize, DataTypes) {
  return sequelize.define('Doctor', {
    doctorId: {
      autoIncrement: true,
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
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
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'doctorId' }
        ]
      }
    ]
  })
}
