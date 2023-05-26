/* UID API
 * An API to create UID's for web applications and other applications
 * Github: https://www.github.com/awesomelewis2007/uid_api
 * License: GNU General Public License v3.0
 * By: Lewis Evans
 */

const express = require('express');
const app = express();
const port = 8000;

const version = '1.0.0';

const welcome_message = `
<style>
    body {
        font-family: sans-serif;
    }

    .content {
        margin: 0 auto;
        width: 80%;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.10);
        padding: 20px;
        border-radius: 10px;
        background-color: #fff;
    }
</style>
<br>
<div class="content">
    <h1>UID API v${version}</h1>
    <hr>
    <p>An API to create UID's for web applications and other applications</p>
    <p>Github: <a href="https://www.github.com/awesomelewis2007/uid_api">https://www.github.com/awesomelewis2007/uid_api</a></p>
    <h2>Usage</h2>
    <p>GET /uid</p>
    <p>GET /uid/custom?length=36&split_char=-&split_every=8</p>
</div>
`

app.get('/', (req, res) => {
    res.send(welcome_message);
});

app.get('/uid', (req, res) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const uidLength = 36;
    let uid = '';
    let split_char = '-';
    for (let i = 0; i < uidLength; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        uid += chars[randomIndex];
    }
    uid = uid.slice(0, 8) + split_char + uid.slice(8, 12) + split_char + uid.slice(12, 16) + split_char + uid.slice(16, 20) + split_char + uid.slice(20, 32);
    res.send(uid);
});

app.get('/uid/custom', (req, res) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uidLength = 36;
    let split_char = '-';
    let split_every = 8;
    let uid = '';

    if (req.query.length) {
        uidLength = req.query.length;
        if (uidLength > 10000) {
            res.send('Error: UID length is too long');
        }
    }

    if (req.query.split_char) {
        split_char = req.query.split_char;
        if (split_char.length > 10) {
            res.send('Error: Split char is too long');
        }
    }

    if (req.query.split_every) {
        split_every = req.query.split_every;
    }

    for (let i = 0; i < uidLength; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        uid += chars[randomIndex];
    }

    let split_uid = '';
    let split_uid_length = 0;
    for (let i = 0; i < uid.length; i++) {
        split_uid += uid[i];
        split_uid_length++;
        if (split_uid_length == split_every) {
            split_uid += split_char;
            split_uid_length = 0;
        }
    }

    if (split_uid[split_uid.length - 1] == split_char) {
        split_uid = split_uid.slice(0, split_uid.length - 1);
    }

    res.send(split_uid);
});

app.listen(port, () => {
    console.log(`UID API listening at http://localhost:${port}`);
});