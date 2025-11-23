# PatriotCTF 2025 – Web Challenges Writeups
**Challenge 3: Feedback Fallout**  
**Author:** [Syndro/Ayco]  
**Category:** Web  

---
<img width="492" height="430" alt="image" src="https://github.com/user-attachments/assets/81a61722-71a8-417f-8c3d-4f0635109c69" />

<h3>The description says a really old version of java, It doesnt say much at the start, but we are going to need it later.</h3>
<img width="1918" height="989" alt="image" src="https://github.com/user-attachments/assets/b8d412d8-1c01-42d0-bc05-eff148bf4d22" />
<h3>The moment we enter the site, We see a feedback text area, I inspected the Source, <br>
- No info on the source. <br>
- Network tab developer tools, No info. <br>
</h3>
<h3>With no where else to look, i intercepted the request using ZAP.</h3>

<img width="1315" height="555" alt="image" src="https://github.com/user-attachments/assets/ceb22927-44ac-4f77-9621-cc402f2cd663" />
<img width="799" height="96" alt="image" src="https://github.com/user-attachments/assets/6de0d39c-c4c4-4ba6-bd6a-4359cd074ec5" />


<h3>And in the ZAP intercept request, We see that Our feedback is getting read directly in the logs.</h3>
<h3>And in the bottom of the page, It already tells us a hint, Log four, and an old version of java, apache tomcat server, This has to be Log4j Vulnerability (CVE-2021–44228) </h3>
<h3>I Was not aware of what this is at first, but after alot of research, Turns out that</h3>
<h3>(CVE-2021-44228), Is a critical RCE vulnerability found in Log4j Library, Long story short, i can execute commands from the feedback prompt</h3>
<h3>But, We are not sure yet!, To be sure, Lets try to execute something basic like the version of the java through ${java:version}</h3>
<img width="1884" height="1027" alt="image" src="https://github.com/user-attachments/assets/47f8d08b-e228-49f0-af15-cb69412853b8" />
<h3>Annnd Yes, its log4j exploit.</h3>
<h3>Then after some digging, I found this cool article Which walks through how to exploit it.</h3>
<pre>https://raxis.com/blog/log4j-exploit/</pre>
<h3>After alot of tries, It still didnt manage to work, No matter what i did.</h3>
<h3>Then, I started doing random env names</h3>
<pre>${env:FLAG},${env:FL$G},${env:FLAG1}${env:flag},${env:secret},${env:admin},${env:root},${env:0},${env:SECRET_FLAG}</pre>
<h3>and it worked, it was just pure guessing, not setup reverse shell and try to take over, a guess, a simple guess....</h3>
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/8ca76960-5865-4b52-89ea-d4afd39b7bc9" />

