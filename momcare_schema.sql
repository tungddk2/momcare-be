DROP SCHEMA IF EXISTS momcare;
CREATE SCHEMA momcare;
USE momcare;

CREATE TABLE Doctor (
    doctorId MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    age TINYINT UNSIGNED NOT NULL,
    sex BOOLEAN NOT NULL,
    phone VARCHAR(20) NOT NULL,
    medicalSpecialty TEXT NOT NULL,
    hospital VARCHAR(300) NOT NULL,
    degree VARCHAR(300) NOT NULL,
    consultingPriceViaMessage INT UNSIGNED NOT NULL,
    consultingPriceViaCall INT UNSIGNED NOT NULL,
    point INT UNSIGNED NOT NULL,
    PRIMARY KEY (doctorId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Patient (
    patientId INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    age TINYINT UNSIGNED NOT NULL,
    sex BOOLEAN NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    PRIMARY KEY (patientId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Hospital (
    hospitalId MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(500) NOT NULL,
    address TEXT NOT NULL,
    workingTime TEXT NOT NULL,
    point INT UNSIGNED NOT NULL,
    commentary TEXT NOT NULL,
    PRIMARY KEY (hospitalId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE DoctorComment (
    doctorCommentId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    time DATETIME NOT NULL,
    patientId INT UNSIGNED NOT NULL,
    doctorId MEDIUMINT UNSIGNED NOT NULL,
    comment TEXT NOT NULL,
    point INT UNSIGNED NOT NULL,
    PRIMARY KEY (doctorCommentId),
    CONSTRAINT fk_DoctorComment_Patient FOREIGN KEY (patientId) REFERENCES Patient (patientId) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_DoctorComment_Doctor FOREIGN KEY (doctorId) REFERENCES Doctor (doctorId) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE HospitalComment (
    hospitalCommentId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    time DATETIME NOT NULL,
    patientId INT UNSIGNED NOT NULL,
    hospitalId MEDIUMINT UNSIGNED NOT NULL,
    comment TEXT NOT NULL,
    point INT UNSIGNED NOT NULL,
    PRIMARY KEY (hospitalCommentId),
    CONSTRAINT fk_HospitalComment_Patient FOREIGN KEY (patientId) REFERENCES Patient (patientId) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_HospitalComment_Hospital FOREIGN KEY (hospitalId) REFERENCES Hospital (hospitalId) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE HospitalAppointment (
    hospitalAppointmentId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    time DATETIME NOT NULL,
    hospitalId MEDIUMINT UNSIGNED NOT NULL,
    patientId INT UNSIGNED NOT NULL,
    state VARCHAR(128) NOT NULL,
    PRIMARY KEY (hospitalAppointmentId),
    CONSTRAINT fk_HospitalAppointment_Hospital FOREIGN KEY (hospitalId) REFERENCES Hospital (hospitalId) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_HospitalAppointment_Patient FOREIGN KEY (patientId) REFERENCES Patient (patientId) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE CallAppointment (
    callAppointmentId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    time DATETIME NOT NULL,
    form VARCHAR(128) NOT NULL,
    doctorId MEDIUMINT UNSIGNED NOT NULL,
    patientId INT UNSIGNED NOT NULL,
    state VARCHAR(128) NOT NULL,
    PRIMARY KEY (callAppointmentId),
    CONSTRAINT fk_CallAppointment_Patient FOREIGN KEY (patientId) REFERENCES Patient (patientId) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_CallAppointment_Doctor FOREIGN KEY (doctorId) REFERENCES Doctor (doctorId) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Call` (
    callId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    callAppointmentId BIGINT UNSIGNED NOT NULL,
    problems TEXT NOT NULL,
    startTime DATETIME NOT NULL,
    endTime DATETIME NOT NULL,
    link VARCHAR(500) DEFAULT NULL,
    PRIMARY KEY (callId),
    CONSTRAINT fk_Call_CallAppointment FOREIGN KEY (callAppointmentId) REFERENCES CallAppointment (callAppointmentId) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Conversation (
    conversationId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    patientId INT UNSIGNED NOT NULL,
    doctorId MEDIUMINT UNSIGNED NOT NULL,
    startTime DATETIME NOT NULL,
    state VARCHAR(128) NOT NULL,
    PRIMARY KEY (conversationId),
    CONSTRAINT fk_Conversation_Patient FOREIGN KEY (patientId) REFERENCES Patient (patientId) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_Conversation_Doctor FOREIGN KEY (doctorId) REFERENCES Doctor (doctorId) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Message (
    messageId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    conversationId BIGINT UNSIGNED NOT NULL,
    sender VARCHAR(128) NOT NULL,
    text TEXT NOT NULL,
    time DATETIME NOT NULL,
    state VARCHAR(128) NOT NULL,
    PRIMARY KEY (messageId),
    CONSTRAINT fk_Message_Conversation FOREIGN KEY (conversationId) REFERENCES Conversation (conversationId) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Attachment (
    attachmentId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    conversationId BIGINT UNSIGNED NOT NULL,
    sender VARCHAR(128) NOT NULL,
    `file` VARCHAR(500) NOT NULL,
    `time` DATETIME NOT NULL,
    state VARCHAR(128) NOT NULL,
    PRIMARY KEY (attachmentId),
    CONSTRAINT fk_Attachment_Conversation FOREIGN KEY (conversationId) REFERENCES Conversation (conversationId) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Payment (
    paymentId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    patientId INT UNSIGNED NOT NULL,
    amount INT UNSIGNED NOT NULL,
    paymentTime DATETIME NOT NULL,
    status VARCHAR(128) NOT NULL,
    paymentMethod VARCHAR(128) NOT NULL,
    PRIMARY KEY (paymentId),
    CONSTRAINT fk_Payment_Patient FOREIGN KEY (patientId) REFERENCES Patient (patientId) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Invoice (
    invoiceId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    consultingServices VARCHAR(128) NOT NULL,
    callAppointmentId BIGINT UNSIGNED NOT NULL,
    conversationId BIGINT UNSIGNED NOT NULL,
    `time` DATETIME NOT NULL,
    dueTime DATETIME NOT NULL,
    totalAmount INT UNSIGNED NOT NULL,
    note TEXT NOT NULL,
    status VARCHAR(128) NOT NULL,
    PRIMARY KEY (invoiceId),
    CONSTRAINT fk_Invoice_CallAppointment FOREIGN KEY (callAppointmentId) REFERENCES CallAppointment (callAppointmentId) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_Invoice_Conversation FOREIGN KEY (conversationId) REFERENCES Conversation (conversationId) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Transaction` (
    transactionId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    invoiceId BIGINT UNSIGNED NOT NULL,
    paymentId BIGINT UNSIGNED NOT NULL,
    `time` DATETIME NOT NULL,
    amount INT UNSIGNED NOT NULL,
    `description` TEXT NOT NULL,
    PRIMARY KEY (transactionId),
    CONSTRAINT fk_Transaction_Invoice FOREIGN KEY (invoiceId) REFERENCES Invoice (invoiceId) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_Transaction_Payment FOREIGN KEY (paymentId) REFERENCES Payment (paymentId) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE MedicalHistory (
    medicalHistoryId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    patientId INT UNSIGNED NOT NULL,
    symptom TEXT NOT NULL,
    existingDiseases TEXT NOT NULL,
    PRIMARY KEY (medicalHistoryId),
    CONSTRAINT fk_MedicalHistory_Patient FOREIGN KEY (patientId) REFERENCES Patient (patientId) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE MedicalRecord (
    medicalRecordId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    patientId INT UNSIGNED NOT NULL,
    doctorId MEDIUMINT UNSIGNED NOT NULL,
    `time` DATETIME NOT NULL,
    medicalHistoryId BIGINT UNSIGNED NOT NULL,
    diagnostic TEXT NOT NULL,
    note TEXT NOT NULL,
    PRIMARY KEY (medicalRecordId),
    CONSTRAINT fk_MedicalRecord_Patient FOREIGN KEY (patientId) REFERENCES Patient (patientId) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_MedicalRecord_Doctor FOREIGN KEY (doctorId) REFERENCES Doctor (doctorId) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_MedicalRecord_MedicalHistory FOREIGN KEY (medicalHistoryId) REFERENCES MedicalHistory (medicalHistoryId) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Prescription (
    prescriptionId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    medicalRecordId BIGINT UNSIGNED NOT NULL,
    medicinesNameAndDosages TEXT NOT NULL,
    usageTime VARCHAR(300) NOT NULL,
    note TEXT NOT NULL,
    PRIMARY KEY (prescriptionId),
    CONSTRAINT fk_Prescription_MedicalRecord FOREIGN KEY (medicalRecordId) REFERENCES MedicalRecord (medicalRecordId) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;