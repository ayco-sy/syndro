# PatriotCTF 2025 – Web Challenges Writeups
**Challenge 5: 🔐 SecureAuth™**  
**Author:** [Syndro/Ayco]  
**Category:** Web  


<img width="473" height="506" alt="image" src="https://github.com/user-attachments/assets/b74dcb4e-5f6e-482d-945a-d4ff6653e710" />

---

### 1- Initial Login page:

The moment we enter into the site, we are greeted by a login prompt with its endpoints.

With the JSON content type, this suggests a NOSQLI injection.

At first, i try to do basic injection into the password with The username admin, So its something like this. <br>

Username: admin <br>
Password: {"$ne": null} ---> This is always true, Its similar to 'or 1='1 in SQL injection. <br>
But, it doesnt seem to work, It suggests that it is getting sent as a String. <br>

<pre>Payload Reference: https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/NoSQL%20Injection</pre>
---
### 2- Using CURL/ZAP/Burp
Then i try to access the API end point using ZAP,

At first, i get Method not allowed, Which means, yo u are using a wrong HTTP Request, By default its GET, So, We edit that in BURP/ZAP, And while we are at it, We also add the content type since its Missing

| Not allowed   | Modifying the headers |
| ------------- | ------------- |
| <img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/f8da4eae-0d3c-425f-bd26-4a9700912330" />  | <img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/aa4de28e-f4d8-48eb-8676-cf063993a634" />  |

---
### 3- Initialization of the attack

Since now everything is working perfect, Now we need to add the Payload, Luckily he already gave us info
<img width="570" height="154" alt="image" src="https://github.com/user-attachments/assets/02f7afdb-0a73-4099-ae0d-25765f629f5b" /> <br>
Now lets try to do that with the first Payload But outside the quotes so it dont get treated as a string
<img width="1919" height="549" alt="image" src="https://github.com/user-attachments/assets/bdd1ac05-e831-4e51-b4b5-33560d2b6883" />

---
### 4- Profits!

And like that we got our flag!
<img width="1919" height="551" alt="image" src="https://github.com/user-attachments/assets/f56ff919-b7e2-4519-b177-e4a78b7d8d65" />


---
### 5- Alternative to ZAP/BURP.

You can also solve it by using CURL instead of zap/burp.

curl -X POST http://18.212.136.134:5200/api/authenticate -H "Content-Type: Application/json" -d '{"username":"admin", "password":{"$ne":null},"remember":"false"}'

<img width="1421" height="480" alt="image" src="https://github.com/user-attachments/assets/06868a28-4cf3-471d-81e5-0397d5ec3b8e" />

