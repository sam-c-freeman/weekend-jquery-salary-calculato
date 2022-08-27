//add test employees here
//add array here

// const employeeOne = {
//     firstName: 'Sam', 
//     lastName: 'Freeman', 
//     idNumber: '9462', 
//     jobTitle: 'Cool Guy', 
//     annualSalary: '50000',
// };
// const employeeTwo = {
//     firstName: 'Sascha', 
//     lastName: 'Kala', 
//     idNumber: '2124', 
//     jobTitle: 'Software Engineer', 
//     annualSalary: '100000'
// };

// const employeeThree = {
//     firstName: 'Ro', 
//     lastName: 'McDonald', 
//     idNumber: '6666', 
//     jobTitle: 'Pet Wrangler', 
//     annualSalary: '75000'
// };


// const employees = [employeeOne, employeeTwo, employeeThree];

const employees = [];

$(document).ready(readyNow);
function readyNow() {
    $('#submitButton').on('click', collectEmployeeData);
    $(document).on('click', '.delete', deleteEmployee);
  }

function collectEmployeeData (){
    let monthlySalary = Math.round(($('#annual-salary').val()/12) * 100) / 100
    let newEmployee = {
        firstName: $('#first-name').val(),
        lastName: $('#last-name').val(),
        idNumber: $('#id-number').val(),
        jobTitle: $('#job-title').val(),
        annualSalary: $('#annual-salary').val(),
        monthlySalary: Number(monthlySalary),
    }
    
//how can I save something at this step so as to append it to the div uniquely?

   
    employees.push(newEmployee); //pushes to employee array
    emptyEmployeeInputs(); //clears inputs
    addEmployeeToDom(); //apends employee to table
    addEmployeeMonthlyCost(); //function to calculate total monthly costs
}
function emptyEmployeeInputs(){
    $('#first-name').val('');
    $('#last-name').val('');
    $('#id-number').val('');
    $('#job-title').val('');
    $('#annual-salary').val('');
}

function addEmployeeToDom(){
    $('#tableBody').empty();
    for (let employee of employees){
        $('#tableBody').append(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.idNumber}</td>
                <td>${employee.jobTitle}</td>
                <td>${employee.annualSalary}</td>
                <td><button id="delete-button" class="delete ${employee.idNumber}">Delete</button></td>
            </tr>
        `)
        $('.employee:last').on('click', deleteEmployee);
    }
}

function addEmployeeMonthlyCost(){
    let monthlyTotalExpenses = 0;
    for (let employee of employees){
        monthlyTotalExpenses += employee.monthlySalary;
    }
    $('#total-monthly').empty();
    $('#total-monthly').append(monthlyTotalExpenses);
    checkIfOverBudget(monthlyTotalExpenses);

}

function checkIfOverBudget (monthlyTotalExpenses){
    if(monthlyTotalExpenses >= 20000){
        $('footer').css("background-color", "#8b0000");
    } //add else for later when subtracting?
}

function deleteEmployee (){
    //this code captures the class of the unique employee
    //by only storing the class after general class
    let employeeClicked = $(this).attr('class').split(' ')[1];
    const index = employees.findIndex(employee => {
        return employee.idNumber === employeeClicked;
      });
      employees.splice(index, 1);
      console.log(employees); 

    
    // let newEmployeeArray = employees.filter(employee => employee.idNumber !== employeeClicked);
    // console.log(newEmployeeArray);

    $(this).parent().parent().remove();
    return employees;
    //it does not actually delete from original array
}

//Notes: would like to add code to incldue a comma in money
