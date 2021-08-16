INSERT INTO department (name)
VALUES 
    (Finance),
    (Engineering),
    (Sales),
    ;


INSERT INTO role (title, salary, department_id)
    VALUES  
    ('Account Manager', 160000, 1),
    ('Accountant', 125000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Weathersbey', 1, NULL),
    ('Jeremy', 'Chan', 2, 1),
    ('Michael', 'Rodriguez', 3, NULL),
    ('Bradley', 'Boyd', 4, 3),