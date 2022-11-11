INSERT INTO department (id, name)
VALUES (1, "Engineering"),
       (2, "Finance"),
       (3, "Legal"),
       (4, "Sales");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Software Engineer", 120000, 1),
       (2, "Lead Engineer", 150000, 1),
       (3, "Accountant", 125000, 2),
       (4, "Account Manager", 160000, 2),
       (5, "Lawyer", 190000, 3),
       (6, "Legal Team Lead", 250000, 3),
       (7, "Salesperson", 80000, 4),
       (8, "Sales Lead", 100000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", 1, 1),
       (2, "Mike", "Chan", 2, 1),
       (3, "Ashley", "Rodriguez", 3, 2),
       (4, "Kevin", "Tupik", 4, 2),
       (5, "Kunal", "Singh", 5, 3),
       (6, "Malia", "Brown", 6, 3),
       (7, "Sarah", "Lourd", 7, 4),
       (8, "Tom", "Allen", 8, 4);