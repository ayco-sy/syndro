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
Adding a bookmark with `{{7*7}}` just gets reflected as plain text → not rendered.

View page source on the Bookmarks tab → jackpot → /search:

```html
<!-- Debug endpoint? -->
<script src="/static/js/bookmarks.js"></script>
<!-- Search bookmarks at /search -->
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
<pre>' UNION SELECT "{{ self.__init__.__globals__.__builtins__.__import__('os').popen('strings *').read() }}" -- </pre>
<pre>Payload References: https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Server%20Side%20Template%20Injection/Python.md</pre>

---

### Trigger the Exploit

Submit the malicious bookmark
CTRL+F -> PCTF
Flag!

