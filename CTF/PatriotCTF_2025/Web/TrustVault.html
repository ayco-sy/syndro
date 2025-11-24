# PatriotCTF 2025 – Web Challenges Writeups
**Challenge 2: Trust vault**  
**Author:** [Syndro/Ayco]  
**Category:** Web  


---

### Initial Observations
The challenge description literally tells us:
- Backend uses **Jinja2** templates
- There’s a **vulnerable SQL query**

Classic hint: **SQLi → SSTI chain**.

![Challenge description](https://github.com/user-attachments/assets/aa873df1-6055-4ed9-9129-aefebebdbef0)

Simple registration → login → we land on a dashboard with four tabs:  
Bookmarks | Audit | Reports | Profile

Only **Bookmarks** matters.

![Dashboard tabs](https://github.com/user-attachments/assets/df9a14c6-ea35-4c40-ad51-4ce70c7b471e)

---

### Finding the SSTI Endpoint
Adding a bookmark with '{{7*7}}' just gets reflected as plain text → not rendered. <br>

<img width="331" height="279" alt="2" src="https://github.com/user-attachments/assets/e0370a28-153c-4781-b92d-44393d1123fc"> <br>

View page source on the Bookmarks tab → /search: <br>


```
  <-- <p>Legacy console: <a href="/search">/search</a></p> -->
   ```


Visiting /search (full URL: http://18.212.136.134:5001/search) shows all our bookmarks and renders them as Jinja2 templates!
The real rendering endpoint
Test payload: "{{7*7}}' → returns 49 → confirmed Jinja2 SSTI!

---

### Finding the SQL Injection


Bookmarks are stored in a database and later rendered with Jinja.
That means the data we insert is used in a raw SQL query → classic SQLi.
 One-Liner Payload (SQLi → SSTI)
 In the bookmark input field:
<pre>' UNION SELECT "{{ self.__init__.__globals__.__builtins__.__import__('os').popen('strings * | grep -i pctf{').read() }}" -- </pre>
<pre>Payload Reference: https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Server%20Side%20Template%20Injection/Python.md</pre>

And like that we get our beloved flag!


<img width="1728" height="708" alt="5" src="https://github.com/user-attachments/assets/8fe90d5f-22f6-448b-90fb-2164a47a2acf" />
---


