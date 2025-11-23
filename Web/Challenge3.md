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
With no where else to look, i intercepted the request using ZAP.

<img width="1315" height="555" alt="image" src="https://github.com/user-attachments/assets/ceb22927-44ac-4f77-9621-cc402f2cd663" />
<img width="799" height="96" alt="image" src="https://github.com/user-attachments/assets/6de0d39c-c4c4-4ba6-bd6a-4359cd074ec5" />

And in the ZAP intercept request, We see that Our feedback is getting read directly in the logs.

So i did some research on Java And logs, And i came across a known vulnerability in Old Java versions,
<pre>(CVE-2021-44228)</pre>
This vulnerability causes us to have RCE ( Remote code execution ) Through logs, And this is what we need!
So, Lets confirm our suspicions and try something basic, I Tried ${java:version}, And voila we get the java version back, AKA, It is vulnerable.
<img width="1884" height="1027" alt="image" src="https://github.com/user-attachments/assets/47f8d08b-e228-49f0-af15-cb69412853b8" />
<h3>Annnd Yes, its log4j exploit.</h3>
<h3>Then after some digging, I found this cool article Which walks through how to exploit it.</h3>
<pre>https://raxis.com/blog/log4j-exploit/</pre>
<h3>After alot of tries, It still didnt manage to work, No matter what i did.</h3>

