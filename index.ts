import fetch, { Response } from 'node-fetch';
import tough from 'tough-cookie'; 
import { URLSearchParams } from 'url'; 
import fs from 'fs'; 

const BASE: string = 'https://challenge.sunvoy.com';
const API: string = 'https://challenge.sunvoy.com';
const jar: tough.CookieJar = new tough.CookieJar();

// Gets the cookies for a website so you can use them
function getCookieHeader(url: string): string {
    return jar.getCookieStringSync(url); // Takes cookies from the jar
}

// Puts new cookies from the website into your cookie jar
async function saveCookies(res: Response, url: string): Promise<void> {
    (res.headers.raw()['set-cookie'] || []) // Look for new cookies
        .forEach((c: string) => jar.setCookieSync(c, url)); // Put each new cookie in the jar
}

// Go to the login page and find a CSRF Token
async function fetchLoginPage(): Promise<string> {
    const res: Response = await fetch(`${BASE}/login`);
    const html: string = await res.text(); 
    await saveCookies(res, BASE); // Save any cookies find
    const m: RegExpMatchArray | null = html.match(/name="nonce"\s+value="([^"]+)"/);
    if (!m) throw new Error('Nonce not found on login page.'); 
    return m[1];
}

// Log in to the website using your name and password
async function login(): Promise<void> {
    const nonce: string = await fetchLoginPage(); // Get the secret code first
    const params: URLSearchParams = new URLSearchParams({ // Make your login info ready
        nonce,
        username: 'demo@example.org', // Your name
        password: 'test' // Your password
    });

    const res: Response = await fetch(`${BASE}/login`, { // Send your login info
        method: 'POST', // Use POST method
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // Tell server how you send data
        body: params.toString(), // Your login info goes here
        redirect: 'manual' // Don't follow where it wants to send you yet
    });

    if (res.status !== 302) throw new Error('Login failed: Expected 302 redirect.'); // If you didn't get sent away, login failed
    await saveCookies(res, BASE); // Save cookies after logging in
}


interface User {
    id: string; // User's ID number
    name: string; // User's name
    email: string; // User's email
}

// Go get the list of all users
async function getUsers(): Promise<User[]> {
    const res: Response = await fetch(`${BASE}/api/users`, {
        method: 'POST',
        headers: {
            cookie: getCookieHeader(BASE),
            'Content-Type': 'application/json'
        }
    });
    if (!res.ok) throw new Error(`Fetch users failed with status: ${res.status}`);
    return res.json() as Promise<User[]>; // Get the user list
}

(async () => {
    try {
        await login();
        const users: User[] = await getUsers();
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
        console.log(`users list saved in the users.json`);
    } catch (e: any) {
        console.error(`An error occurred: ${e.message}`);
    }
})();


