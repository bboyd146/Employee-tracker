INSERT INTO department (name)
VALUES 
    (Finance),
    (Engineering),
    ;


INSERT INTO role (title, salary, department_id)
    VALUES  
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),