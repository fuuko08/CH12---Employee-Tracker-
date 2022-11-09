SELECT employee.id, employee.first_name, employee.last_name, role.salary
FROM employee
JOIN role ON role.id = employee.id