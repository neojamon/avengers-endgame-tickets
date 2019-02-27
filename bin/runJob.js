#!/usr/bin/env node
const jobs = require('../jobs');

const args = process.argv.slice(2);

function printAvailableJobs() {
    console.info('Available jobs: ', Object.keys(jobs).join(', '));
}

const job = args[0];
if (!job) {
    printAvailableJobs();
    return;
}

if (!jobs[job]) {
    console.error(`Unknown job "${job}"`);
    printAvailableJobs();
    return;
}

jobs[job]()
    .then(result => console.log(result))
    .catch(error => console.log(error));
