Sunvoy Full-Stack Developer Assessment

This repository contains the solution for the Sunvoy Full-Stack Developer assessment.
Challenge Overview
The task was to reverse engineer a legacy web application (challenge.sunvoy.com) to programmatically retrieve a list of users and the currently logged-in user's details.

Solution Steps Implemented

Loom Video: https://www.loom.com/share/c8e914a03d55486eaffffd3e429be967?sid=0aadbe7c-881b-4329-962e-8bfc3971058f


How to Run the Script
To run this script and generate the users.json file:
Clone the repository: https://github.com/pr40934/Sunvoy-Full-Stack-Developer-Assessment.git
git clone Sunvoy-Full-Stack-Developer-Assessment
cd sunvoy-challenge


Install dependencies:
npm install

Run the script:
npm run start

Success Criteria Checklist
[+] The script can be executed via npm run start.
[+] The script does not throw any errors.
[+] Running the script results in a users.json 
[x] Only 9 user No current user (9 users + 1 current user entry).
[+] Uses the current LTS version of Node.js (specified in package.json).
[+] Uses a minimum of dependencies (node-fetch, tough-cookie).
Total Time Spent
