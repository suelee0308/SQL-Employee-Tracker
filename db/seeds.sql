INSERT INTO department (dep_name)
VALUES  ("Accounting"),
        ("Sales"),
        ("Customer Service"),
        ("Quality Assurance"),
        ("Warehouse"),
        ("Management");
    
INSERT INTO employee_role (title, salary, department_id)
VALUES  ("Regional Manager", 120000, 6),
        ("Co-Manager", 1000000, 6),
        ("Receptionist", 65000, 3),
        ("Customer Service Agent", 70000, 3),
        ("Accountant", 1000000, 1),
        ("Salesman", 80000, 2),
        ("Quality Control Manager", 72000, 4),
        ("Head Foreman", 85000, 5),
        ("Warehouse Coordinator", 55000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Michael", "Scott", 1, NULL),
        ("Jim", "Halpert", 2, 1),
        ("Pam", "Beasley", 3, 1),
        ("Erin", "Hannon", 3, 1),
        ("Kellly", "Kapoor", 4, 1),
        ("Oscar", "Martinez", 5, 1),
        ("Kevin", "Malone", 5, 1),
        ("Angela", "Martin", 5, 1),
        ("Dwight", "Schrute", 6, 1),
        ("Stanley", "Hudson", 6, 1),
        ("Phillis", "Vance", 6, 1),
        ("Andy", "Bernard", 6, 1),
        ("Creed", "Bratton", 7, 1),
        ("Darryl", "Philban", 8, 1),
        ("Roy", "Anderson", 9, 1);