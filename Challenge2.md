### Challenge 2: Trust Vault
**Category:** Web  
**Tags:** SQL Injection → SSTI (Jinja2) → RCE  

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


