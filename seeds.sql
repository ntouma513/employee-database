INSERT INTO department (name) VALUES 
    ('Engineering'), 
    ('Finance'), 
    ('Marketing');

INSERT INTO role (title, salary, department_id) VALUES 
    ('Software Engineer', 120000, 1),
    ('Accountant', 80000, 2),
    ('Marketing Manager', 100000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
    ('Alice', 'Smith', 1, NULL),
    ('Bob', 'Johnson', 2, NULL),
    ('Charlie', 'Brown', 3, 1);
