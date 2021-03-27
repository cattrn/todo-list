## Table: users

 Column       |          Type          | Collation | Nullable |              Default               
--------------+------------------------+-----------+----------+------------------------------------
 id           | integer                |           | not null | generated always as identity
 email        | character varying(100) |           | not null | 
 password     | character(60)          |           | not null | 
 is_active    | boolean                |           | not null | false
 start_of_day | time without time zone |           | not null | '05:00:00'::time without time zone

**Referenced by:**
    TABLE "email_confirmation" CONSTRAINT "email_confirmation_email_fkey" FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
    TABLE "password_reset" CONSTRAINT "password_reset_email_fkey" FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
    TABLE "recurring_tasks" CONSTRAINT "recurring_tasks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    TABLE "tasks" CONSTRAINT "tasks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

## Table: tasks


    Column    |           Type           | Collation | Nullable |           Default            
--------------+--------------------------+-----------+----------+------------------------------
 id           | integer                  |           | not null | generated always as identity
 user_id      | integer                  |           | not null | 
 task         | character varying(255)   |           | not null | 
 due_date     | timestamp with time zone |           |          | 
 created_at   | timestamp with time zone |           |          | 
 updated_at   | timestamp with time zone |           |          | now()
 complete     | boolean                  |           | not null | false
 recurring_id | integer                  |           |          | 

 **Foreign-key constraints:**
    "fk_recurring" FOREIGN KEY (recurring_id) REFERENCES recurring_tasks(id) ON DELETE CASCADE
    "tasks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE


## Table: recurring_tasks

   Column   |           Type           | Collation | Nullable |           Default            
------------+--------------------------+-----------+----------+------------------------------
 id         | integer                  |           | not null | generated always as identity
 user_id    | integer                  |           | not null | 
 task       | character varying(255)   |           | not null | 
 frequency  | integer                  |           | not null | 
 start_date | timestamp with time zone |           |          | 
 created_at | timestamp with time zone |           |          | 
 updated_at | timestamp with time zone |           |          | now()

**Foreign-key constraints:**
    "recurring_tasks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

**Referenced by:**
    TABLE "tasks" CONSTRAINT "fk_recurring" FOREIGN KEY (recurring_id) REFERENCES recurring_tasks(id) ON DELETE CASCADE


## Table: email_confirmation

   Column   |           Type           | Collation | Nullable |           Default            
------------+--------------------------+-----------+----------+------------------------------
 hash_id    | integer                  |           | not null | generated always as identity
 email      | character varying(50)    |           | not null | 
 hash       | character(60)            |           | not null | 
 created_at | timestamp with time zone |           | not null | now()

 **Foreign-key constraints:**
    "email_confirmation_email_fkey" FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE


## Table: password_reset

   Column   |           Type           | Collation | Nullable |           Default            
------------+--------------------------+-----------+----------+------------------------------
 hash_id    | integer                  |           | not null | generated always as identity
 email      | character varying(50)    |           | not null | 
 hash       | character(60)            |           | not null | 
 created_at | timestamp with time zone |           | not null | now()

**Foreign-key constraints:**
    "password_reset_email_fkey" FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE