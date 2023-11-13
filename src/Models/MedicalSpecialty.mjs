export default function(sequelize, DataTypes) {
  return sequelize.define('MedicalSpecialty', {
    id: {
      autoIncrement: true,
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    englishName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    vietnameseName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    tableName: 'MedicalSpecialty',
    timestamps: true,
  })
}
