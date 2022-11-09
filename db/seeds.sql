INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 1),
       ("Lead Engineer", 150000, 1),
       ("Accountant", 125000, 2),
       ("Account Manager", 160000, 2),
       ("Lawyer", 190000, 3),
       ("Legal Team Lead", 250000, 3),
       ("Salesperson", 80000, 4),
       ("Sales Lead", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1),
       ("Mike", "Chan", 2),
       ("Ashley", "Rodriguez", 3),
       ("Kevin", "Tupik", 4),
       ("Kunal", "Singh", 5),
       ("Malia", "Brown", 6),
       ("Sarah", "Lourd", 7),
       ("Tom", "Allen", 8);