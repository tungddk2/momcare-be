var DataTypes = require("sequelize").DataTypes;
var _Attachment = require("./Attachment");
var _Call = require("./Call");
var _CallAppointment = require("./CallAppointment");
var _Conversation = require("./Conversation");
var _Doctor = require("./Doctor");
var _DoctorComment = require("./DoctorComment");
var _Hospital = require("./Hospital");
var _HospitalAppointment = require("./HospitalAppointment");
var _HospitalComment = require("./HospitalComment");
var _Invoice = require("./Invoice");
var _MedicalHistory = require("./MedicalHistory");
var _MedicalRecord = require("./MedicalRecord");
var _Message = require("./Message");
var _Patient = require("./Patient");
var _Payment = require("./Payment");
var _Prescription = require("./Prescription");
var _Transaction = require("./Transaction");

function initModels(sequelize) {
  var Attachment = _Attachment(sequelize, DataTypes);
  var Call = _Call(sequelize, DataTypes);
  var CallAppointment = _CallAppointment(sequelize, DataTypes);
  var Conversation = _Conversation(sequelize, DataTypes);
  var Doctor = _Doctor(sequelize, DataTypes);
  var DoctorComment = _DoctorComment(sequelize, DataTypes);
  var Hospital = _Hospital(sequelize, DataTypes);
  var HospitalAppointment = _HospitalAppointment(sequelize, DataTypes);
  var HospitalComment = _HospitalComment(sequelize, DataTypes);
  var Invoice = _Invoice(sequelize, DataTypes);
  var MedicalHistory = _MedicalHistory(sequelize, DataTypes);
  var MedicalRecord = _MedicalRecord(sequelize, DataTypes);
  var Message = _Message(sequelize, DataTypes);
  var Patient = _Patient(sequelize, DataTypes);
  var Payment = _Payment(sequelize, DataTypes);
  var Prescription = _Prescription(sequelize, DataTypes);
  var Transaction = _Transaction(sequelize, DataTypes);

  Call.belongsTo(CallAppointment, { as: "callAppointment", foreignKey: "callAppointmentId"});
  CallAppointment.hasMany(Call, { as: "Calls", foreignKey: "callAppointmentId"});
  Invoice.belongsTo(CallAppointment, { as: "callAppointment", foreignKey: "callAppointmentId"});
  CallAppointment.hasMany(Invoice, { as: "Invoices", foreignKey: "callAppointmentId"});
  Attachment.belongsTo(Conversation, { as: "conversation", foreignKey: "conversationId"});
  Conversation.hasMany(Attachment, { as: "Attachments", foreignKey: "conversationId"});
  Invoice.belongsTo(Conversation, { as: "conversation", foreignKey: "conversationId"});
  Conversation.hasMany(Invoice, { as: "Invoices", foreignKey: "conversationId"});
  Message.belongsTo(Conversation, { as: "conversation", foreignKey: "conversationId"});
  Conversation.hasMany(Message, { as: "Messages", foreignKey: "conversationId"});
  CallAppointment.belongsTo(Doctor, { as: "doctor", foreignKey: "doctorId"});
  Doctor.hasMany(CallAppointment, { as: "CallAppointments", foreignKey: "doctorId"});
  Conversation.belongsTo(Doctor, { as: "doctor", foreignKey: "doctorId"});
  Doctor.hasMany(Conversation, { as: "Conversations", foreignKey: "doctorId"});
  DoctorComment.belongsTo(Doctor, { as: "doctor", foreignKey: "doctorId"});
  Doctor.hasMany(DoctorComment, { as: "DoctorComments", foreignKey: "doctorId"});
  MedicalRecord.belongsTo(Doctor, { as: "doctor", foreignKey: "doctorId"});
  Doctor.hasMany(MedicalRecord, { as: "MedicalRecords", foreignKey: "doctorId"});
  HospitalAppointment.belongsTo(Hospital, { as: "hospital", foreignKey: "hospitalId"});
  Hospital.hasMany(HospitalAppointment, { as: "HospitalAppointments", foreignKey: "hospitalId"});
  HospitalComment.belongsTo(Hospital, { as: "hospital", foreignKey: "hospitalId"});
  Hospital.hasMany(HospitalComment, { as: "HospitalComments", foreignKey: "hospitalId"});
  Transaction.belongsTo(Invoice, { as: "invoice", foreignKey: "invoiceId"});
  Invoice.hasMany(Transaction, { as: "Transactions", foreignKey: "invoiceId"});
  MedicalRecord.belongsTo(MedicalHistory, { as: "medicalHistory", foreignKey: "medicalHistoryId"});
  MedicalHistory.hasMany(MedicalRecord, { as: "MedicalRecords", foreignKey: "medicalHistoryId"});
  Prescription.belongsTo(MedicalRecord, { as: "medicalRecord", foreignKey: "medicalRecordId"});
  MedicalRecord.hasMany(Prescription, { as: "Prescriptions", foreignKey: "medicalRecordId"});
  CallAppointment.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(CallAppointment, { as: "CallAppointments", foreignKey: "patientId"});
  Conversation.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(Conversation, { as: "Conversations", foreignKey: "patientId"});
  DoctorComment.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(DoctorComment, { as: "DoctorComments", foreignKey: "patientId"});
  HospitalAppointment.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(HospitalAppointment, { as: "HospitalAppointments", foreignKey: "patientId"});
  HospitalComment.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(HospitalComment, { as: "HospitalComments", foreignKey: "patientId"});
  MedicalHistory.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(MedicalHistory, { as: "MedicalHistories", foreignKey: "patientId"});
  MedicalRecord.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(MedicalRecord, { as: "MedicalRecords", foreignKey: "patientId"});
  Payment.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(Payment, { as: "Payments", foreignKey: "patientId"});
  Transaction.belongsTo(Payment, { as: "payment", foreignKey: "paymentId"});
  Payment.hasMany(Transaction, { as: "Transactions", foreignKey: "paymentId"});

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
    Transaction,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
