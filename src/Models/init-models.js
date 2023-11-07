const DataTypes = require('sequelize').DataTypes
const _Attachment = require('./Attachment')
const _Call = require('./Call')
const _CallAppointment = require('./CallAppointment')
const _Conversation = require('./Conversation')
const _Doctor = require('./Doctor')
const _DoctorComment = require('./DoctorComment')
const _Hospital = require('./Hospital')
const _HospitalAppointment = require('./HospitalAppointment')
const _HospitalComment = require('./HospitalComment')
const _Invoice = require('./Invoice')
const _MedicalHistory = require('./MedicalHistory')
const _MedicalRecord = require('./MedicalRecord')
const _Message = require('./Message')
const _Patient = require('./Patient')
const _Payment = require('./Payment')
const _Prescription = require('./Prescription')
const _Transaction = require('./Transaction')

function initModels (sequelize) {
  const Attachment = _Attachment(sequelize, DataTypes)
  const Call = _Call(sequelize, DataTypes)
  const CallAppointment = _CallAppointment(sequelize, DataTypes)
  const Conversation = _Conversation(sequelize, DataTypes)
  const Doctor = _Doctor(sequelize, DataTypes)
  const DoctorComment = _DoctorComment(sequelize, DataTypes)
  const Hospital = _Hospital(sequelize, DataTypes)
  const HospitalAppointment = _HospitalAppointment(sequelize, DataTypes)
  const HospitalComment = _HospitalComment(sequelize, DataTypes)
  const Invoice = _Invoice(sequelize, DataTypes)
  const MedicalHistory = _MedicalHistory(sequelize, DataTypes)
  const MedicalRecord = _MedicalRecord(sequelize, DataTypes)
  const Message = _Message(sequelize, DataTypes)
  const Patient = _Patient(sequelize, DataTypes)
  const Payment = _Payment(sequelize, DataTypes)
  const Prescription = _Prescription(sequelize, DataTypes)
  const Transaction = _Transaction(sequelize, DataTypes)

  Call.belongsTo(CallAppointment, { as: 'callAppointment', foreignKey: 'callAppointmentId' })
  CallAppointment.hasMany(Call, { as: 'Calls', foreignKey: 'callAppointmentId' })
  Invoice.belongsTo(CallAppointment, { as: 'callAppointment', foreignKey: 'callAppointmentId' })
  CallAppointment.hasMany(Invoice, { as: 'Invoices', foreignKey: 'callAppointmentId' })
  Attachment.belongsTo(Conversation, { as: 'conversation', foreignKey: 'conversationId' })
  Conversation.hasMany(Attachment, { as: 'Attachments', foreignKey: 'conversationId' })
  Invoice.belongsTo(Conversation, { as: 'conversation', foreignKey: 'conversationId' })
  Conversation.hasMany(Invoice, { as: 'Invoices', foreignKey: 'conversationId' })
  Message.belongsTo(Conversation, { as: 'conversation', foreignKey: 'conversationId' })
  Conversation.hasMany(Message, { as: 'Messages', foreignKey: 'conversationId' })
  CallAppointment.belongsTo(Doctor, { as: 'doctor', foreignKey: 'doctorId' })
  Doctor.hasMany(CallAppointment, { as: 'CallAppointments', foreignKey: 'doctorId' })
  Conversation.belongsTo(Doctor, { as: 'doctor', foreignKey: 'doctorId' })
  Doctor.hasMany(Conversation, { as: 'Conversations', foreignKey: 'doctorId' })
  DoctorComment.belongsTo(Doctor, { as: 'doctor', foreignKey: 'doctorId' })
  Doctor.hasMany(DoctorComment, { as: 'DoctorComments', foreignKey: 'doctorId' })
  MedicalRecord.belongsTo(Doctor, { as: 'doctor', foreignKey: 'doctorId' })
  Doctor.hasMany(MedicalRecord, { as: 'MedicalRecords', foreignKey: 'doctorId' })
  HospitalAppointment.belongsTo(Hospital, { as: 'hospital', foreignKey: 'hospitalId' })
  Hospital.hasMany(HospitalAppointment, { as: 'HospitalAppointments', foreignKey: 'hospitalId' })
  HospitalComment.belongsTo(Hospital, { as: 'hospital', foreignKey: 'hospitalId' })
  Hospital.hasMany(HospitalComment, { as: 'HospitalComments', foreignKey: 'hospitalId' })
  Transaction.belongsTo(Invoice, { as: 'invoice', foreignKey: 'invoiceId' })
  Invoice.hasMany(Transaction, { as: 'Transactions', foreignKey: 'invoiceId' })
  MedicalRecord.belongsTo(MedicalHistory, { as: 'medicalHistory', foreignKey: 'medicalHistoryId' })
  MedicalHistory.hasMany(MedicalRecord, { as: 'MedicalRecords', foreignKey: 'medicalHistoryId' })
  Prescription.belongsTo(MedicalRecord, { as: 'medicalRecord', foreignKey: 'medicalRecordId' })
  MedicalRecord.hasMany(Prescription, { as: 'Prescriptions', foreignKey: 'medicalRecordId' })
  CallAppointment.belongsTo(Patient, { as: 'patient', foreignKey: 'patientId' })
  Patient.hasMany(CallAppointment, { as: 'CallAppointments', foreignKey: 'patientId' })
  Conversation.belongsTo(Patient, { as: 'patient', foreignKey: 'patientId' })
  Patient.hasMany(Conversation, { as: 'Conversations', foreignKey: 'patientId' })
  DoctorComment.belongsTo(Patient, { as: 'patient', foreignKey: 'patientId' })
  Patient.hasMany(DoctorComment, { as: 'DoctorComments', foreignKey: 'patientId' })
  HospitalAppointment.belongsTo(Patient, { as: 'patient', foreignKey: 'patientId' })
  Patient.hasMany(HospitalAppointment, { as: 'HospitalAppointments', foreignKey: 'patientId' })
  HospitalComment.belongsTo(Patient, { as: 'patient', foreignKey: 'patientId' })
  Patient.hasMany(HospitalComment, { as: 'HospitalComments', foreignKey: 'patientId' })
  MedicalHistory.belongsTo(Patient, { as: 'patient', foreignKey: 'patientId' })
  Patient.hasMany(MedicalHistory, { as: 'MedicalHistories', foreignKey: 'patientId' })
  MedicalRecord.belongsTo(Patient, { as: 'patient', foreignKey: 'patientId' })
  Patient.hasMany(MedicalRecord, { as: 'MedicalRecords', foreignKey: 'patientId' })
  Payment.belongsTo(Patient, { as: 'patient', foreignKey: 'patientId' })
  Patient.hasMany(Payment, { as: 'Payments', foreignKey: 'patientId' })
  Transaction.belongsTo(Payment, { as: 'payment', foreignKey: 'paymentId' })
  Payment.hasMany(Transaction, { as: 'Transactions', foreignKey: 'paymentId' })

  return {
    Attachment,
    Call,
    CallAppointment,
    Conversation,
    Doctor,
    DoctorComment,
    Hospital,
    HospitalAppointment,
    HospitalComment,
    Invoice,
    MedicalHistory,
    MedicalRecord,
    Message,
    Patient,
    Payment,
    Prescription,
    Transaction
  }
}
module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels
