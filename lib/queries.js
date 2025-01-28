const pool = require('../db/db');

const Queries = {
  getAllDepartments: async () => {
    const res = await pool.query('SELECT * FROM department');
    return res.rows;
  },

  getAllRoles: async () => {
    const res = await pool.query(
      `SELECT role.id, role.title, department.name AS department, role.salary
       FROM role
       INNER JOIN department ON role.department_id = department.id`
    );
    return res.rows;
  },

  getAllEmployees: async () => {
    const res = await pool.query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,
       CONCAT(manager.first_name, ' ', manager.last_name) AS manager
       FROM employee
       INNER JOIN role ON employee.role_id = role.id
       INNER JOIN department ON role.department_id = department.id
       LEFT JOIN employee AS manager ON employee.manager_id = manager.id`
    );
    return res.rows;
  },

  addDepartment: async (name) => {
    await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
  },

  addRole: async (title, salary, department_id) => {
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [
      title,
      salary,
      department_id,
    ]);
  },

  addEmployee: async (first_name, last_name, role_id, manager_id) => {
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [
      first_name,
      last_name,
      role_id,
      manager_id,
    ]);
  },

  updateEmployeeRole: async (employee_id, role_id) => {
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
  },
};

module.exports = Queries;
