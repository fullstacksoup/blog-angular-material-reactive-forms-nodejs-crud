const express = require('express');
const app = express();
const port = 3004;
var sqlite3 = require('sqlite3').verbose()
const cors = require('cors');

const DBSOURCE = "usersdb.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    }
    else {
        // ** EXAMPLE **
        // ** For a column with unique values **
        // email TEXT UNIQUE, 
        // with CONSTRAINT email_unique UNIQUE (email) 

        db.run(`CREATE TABLE Users (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,                
            Name TEXT,             
            Email TEXT,
            Description TEXT,
            Category INTEGER,
            DateModified DATE,
            DateCreated DATE
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO Users (Name,  Description, Email, Category, DateCreated) VALUES (?,?,?,?,?)'
                    db.run(insert, ['Eddie Van Halen', 'Lead Guitar for Van Halen', 'eddiev@email.com', 3, Date('now')])
                    db.run(insert, ['Joe Satriani', 'Lead Guitar for Joe Satriani', 'joe@email.com', 3, Date('now')])
                    db.run(insert, ['Dave Mathews', 'Singer Guitarist for Dave Mathews', 'dave@email.com', 1, Date('now')])
                    db.run(insert, ['Sandy Saraya', 'Lead singer of Saraya', 'saraya@email.com', 1, Date('now')])
                    db.run(insert, ['Rosy Tedjedor', 'Singer of My FIrst Crush', 'rosy@email.com', 1, , Date('now')])
                    db.run(insert, ['Aaron Spears', 'Gospil Drumer', 'aaron@email.com', 3, Date('now')])
                    db.run(insert, ['Neil Piert', 'Drummer for Rush', 'neil@email.com', 4, Date('now')])
                    db.run(insert, ['Geddy Lee', 'Bassist for Rush', 'geddy@email.com', 2, Date('now')])
                    db.run(insert, ['Alex Lifeson', 'Lead Guitarist for Rush', 'alex@email.com', 3, Date('now')])
                    db.run(insert, ['Jeff Pacaro', 'Original Drumer for Totto', 'jeff@email.com', 4, Date('now')])
                }
            });
    }
});


module.exports = db

app.use(
    express.urlencoded(),
    cors()
);

app.get('/', (req, res) => res.send('API Root'));

//* G E T   A L L
app.get("/api/users", (req, res, next) => {
    var sql = "SELECT * FROM Users"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

//* G E T   S I N G L E   P R O D U C T
app.get("/api/user/:id", (req, res, next) => {
    var sql = "SELECT * FROM Users WHERE Id = ?"
    db.all(sql, req.params.id, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
})

//* C R E A T E 
app.post("/api/user", (req, res) => {
    var errors = []

    if (!req.body.Name) {
        errors.push("Name is missing");
    }
    if (!req.body.Email) {
        errors.push("Email is missing");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        Title: req.body.Title,
        Quantity: req.body.Quantity,
        DateCreated: Date('now')
    }
    var sql = 'INSERT INTO Users (Name, Email, Description, Category, DateCreated) VALUES (?,?,?,?,?)'
    var params = [data.Title, data.Quantity, Date('now')]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
})

//* U P D A T E
app.put("/api/user", (req, res, next) => {
    console.log('req', req.body)
    var data = [req.body.Name, req.body.Email, req.body.Description, req.body.Category, Date('now'), req.body.Id];
    console.log('data', data)
    let sql = `UPDATE Users SET 
               Name = ?, 
               Email = ?, 
               Description = ?, 
               Category = ?, 
               DateModified = ?
               WHERE Id = ?`;

    db.run(sql, data, function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);

    });

    res.json({
        message: "success",
        data: data,
        changes: this.changes
    })
})

//* D E L E T E
app.delete("/api/users/:id", (req, res, next) => {
    db.run(
        'DELETE FROM Users WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "Deleted", changes: this.changes })
        });
})

app.listen(port, () => console.log(`API listening on port ${port}!`));