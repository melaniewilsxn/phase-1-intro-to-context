function  createEmployeeRecord(employeeRecordArray){
    const employeeRecordObj = {
        firstName: employeeRecordArray[0],
        familyName: employeeRecordArray[1],
        title: employeeRecordArray[2],
        payPerHour: employeeRecordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecordObj
}

function createEmployeeRecords(employeeRecordsArray){
    let employeeRecords = employeeRecordsArray.map(createEmployeeRecord)
    return employeeRecords;
    
    // const employeeRecordsObjArray = []
    // employeeRecordsArray.forEach(employeeRecordArray => employeeRecordsObjArray.push(createEmployeeRecord(employeeRecordArray)))
    // return employeeRecordsObjArray;
}

function createTimeInEvent(employeeRecordObj, date){
    const newTimeInEvent= {
        type: "TimeIn",
        hour: Number(date.slice(-4,-2)+'00'),
        date: date.slice(0, 10)
    }
    employeeRecordObj.timeInEvents.push(newTimeInEvent)
    return employeeRecordObj;
}

function createTimeOutEvent(employeeRecordObj, date){
    const newTimeOutEvent= {
        type: "TimeOut",
        hour: Number(date.slice(-4,-2)+'00'),
        date: date.slice(0, 10)
    }
    employeeRecordObj.timeOutEvents.push(newTimeOutEvent)
    return employeeRecordObj;
}

function hoursWorkedOnDate(employeeRecordObj, date){
    let timeIn = 0
    let timeOut = 0
    let hoursWorked = 0
    for (let i=0; i<employeeRecordObj.timeInEvents.length; i++){
        if(employeeRecordObj.timeInEvents[i].date === date.slice(0, 10)){
            timeIn = employeeRecordObj.timeInEvents[i].hour
        }
        if(employeeRecordObj.timeOutEvents[i].date === date.slice(0, 10)){
            timeOut = employeeRecordObj.timeOutEvents[i].hour
        }
    }
    hoursWorked = (timeOut-timeIn)/100
    return hoursWorked;
}

function wagesEarnedOnDate(employeeRecordObj, date){
    let wagesEarned = hoursWorkedOnDate(employeeRecordObj, date)*employeeRecordObj.payPerHour;
    return wagesEarned;
}

function allWagesFor(employeeRecordObj){
    let allWages = 0
    for (let i=0; i<employeeRecordObj.timeInEvents.length; i++){
        let date = employeeRecordObj.timeInEvents[i].date
        allWages += wagesEarnedOnDate(employeeRecordObj, date)
    }
    return allWages;
}

function calculatePayroll(employeeRecordsArray){
    let payroll = 0
    employeeRecordsArray.forEach(employeeRecordArray => {
        payroll += allWagesFor(employeeRecordArray)
    })
    return payroll;
}