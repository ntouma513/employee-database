const Prompts = require('./lib/prompts'); // Import inquirer prompts
const Queries = require('./lib/queries'); // Import SQL query functions
const Helpers = require('./lib/helpers'); // Import utility functions

// Main menu function
async function mainMenu() {
  const { action } = await Prompts.mainMenu(); // Prompt user for main menu action

  switch (action) {
    case 'View All Departments':
      const departments = await Queries.getAllDepartments();
      Helpers.logTable(departments);
      break;

    case 'View All Roles':
      const roles = await Queries.getAllRoles();
      Helpers.logTable(roles);
      break;

    case 'View All Employees':
      const employees = await Queries.getAllEmployees();
      Helpers.logTable(employees);
      break;

    case 'Add a Department':
      const { name } = await Prompts.addDepartment();
      await Queries.addDepartment(name);
      Helpers.logSuccess(`Department '${name}' added successfully!`);
      break;

    case 'Add a Role':
      const departmentList = await Queries.getAllDepartments();
      const roleData = await Prompts.addRole(departmentList);
      await Queries.addRole(roleData.title, roleData.salary, roleData.department_id);
      Helpers.logSuccess(`Role '${roleData.title}' added successfully!`);
      break;

    case 'Add an Employee':
      const roleList = await Queries.getAllRoles();
      const employeeList = await Queries.getAllEmployees();
      const employeeData = await Prompts.addEmployee(roleList, employeeList);
      await Queries.addEmployee(employeeData.first_name, employeeData.last_name, employeeData.role_id, employeeData.manager_id);
      Helpers.logSuccess(`Employee '${employeeData.first_name} ${employeeData.last_name}' added successfully!`);
      break;

    case 'Update an Employee Role':
      const employeesForUpdate = await Queries.getAllEmployees();
      const rolesForUpdate = await Queries.getAllRoles();
      const updateData = await Prompts.updateEmployeeRole(employeesForUpdate, rolesForUpdate);
      await Queries.updateEmployeeRole(updateData.employee_id, updateData.role_id);
      Helpers.logSuccess('Employee role updated successfully!');
      break;

    case 'Exit':
      console.log('Goodbye!');
      process.exit();
  }

  // Recursively call the main menu after completing an action
  mainMenu();
}

// Start the application
mainMenu();
