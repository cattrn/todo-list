## Table: users


| `Column Name` | `Type`      | `Constrains`           | `Description` |
| ------------- | ----------- | ---------------------- | ------------- |
| id            | INT         | PRIMARY KEY            |               |
| firstname     | VARCHAR(50) | NOT NULL               |               |
| lastname      | VARCHAR(50) | NOT NULL               |               |
| email         | VARCHAR(50) | NOT NULL UNIQUE        |               |
| password      | CHAR(60)    | NOT NULL               |               |
| is_active     | BOOLEAN     | NOT NULL DEFAULT false |               |

## Table: tasks


| `Column Name` | `Type`       | `Constrains`                                                     | `Description` |
| ------------- | ------------ | ---------------------------------------------------------------- | ------------- |
| id            | INT          | PRIMARY KEY                                                      |               |
| user_id       | INT          | FOREIGN KEY REFERENCES users(id) NOT NULL ON DELETE CASCADE      |               |
| task          | VARCHAR(255) | NOT NULL                                                         |               |
| create_at     | TIMESTAMPTZ  |                                                                  |               |
| update_at     | TIMESTAMPTZ  | DEFAULT now()                                                    |               |

## Table: email_confirmation


| `Column Name` | `Type`      | `Constrains`                                                          | `Description` |
| ------------- | ----------- | --------------------------------------------------------------------- | ------------- |
| id            | INT         | PRIMARY KEY                                                           |               |
| email         | VARCHAR(50) | FOREIGN KEY REFERENCES users(email) NOT NULL UNIQUE ON DELETE CASCADE |               |
| hash          | CHAR(60)    | NOT NULL                                                              |               |
| create_at     | TIMESTAMPTZ | NOT NULL DEFAULT now()                                                |               |

## Table: password_reset


| `Column Name` | `Type`      | `Constrains`                                                          | `Description` |
| ------------- | ----------- | --------------------------------------------------------------------- | ------------- |
| id            | INT         | PRIMARY KEY                                                           |               |
| email         | VARCHAR(50) | FOREIGN KEY REFERENCES users(email) NOT NULL UNIQUE ON DELETE CASCADE |               |
| hash          | CHAR(60)    | NOT NULL                                                              |               |
| create_at     | TIMESTAMPTZ | NOT NULL DEFAULT now()                                                |               |
