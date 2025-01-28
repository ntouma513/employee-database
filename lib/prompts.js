const inquirer = require('inquirer');

const Prompts = {
  mainMenu: async () => {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'Update an Employee Role',
          'Exit',
        ],
      },
    ]);
  },

  addDepartment: async () => {
    return inquirer.prompt([
      { type: 'input', name: 'name', message: 'Enter department name:' },
    ]);
  },

  addRole: async (departments) => {
    return inquirer.prompt([
      { type: 'input', name: 'title', message: 'Enter role title:' },
      { type: 'input', name: 'salary', message: 'Enter role salary:' },
      {
        type: 'list',
        name: 'department_id',
        message: 'Select department:',
        choices: departments.map((dept) => ({ name: dept.name, value: dept.id })),
      },
    ]);
  },

  addEmployee: async (roles, employees) => {
    return inquirer.prompt([
      { type: 'input', name: 'first_name', message: "Enter employee's first name:" },
      { type: 'input', name: 'last_name', message: "Enter employee's last name:" },
      {
        type: 'list',
        name: 'role_id',
        message: 'Select role:',
        choices: roles.map((role) => ({ name: role.title, value: role.id })),
      },
      {
        type: 'list',
        name: 'manager_id',
        message: 'Select manager (optional):',
        choices: [{ name: 'None', value: null }, ...employees.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))],
      },
    ]);
  },

  updateEmployeeRole: async (employees, roles) => {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Select employee:',
        choices: employees.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })),
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'Select new role:',
        choices: roles.map((role) => ({ name: role.title, value: role.id })),
      },
    ]);
  },
};

module.exports = Prompts;
