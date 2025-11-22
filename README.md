# PatriotCTF2025-Web
Writeups for web-challenges Partriot-CTF

# Challenge-1: Connection Tester
<img width="491" height="461" alt="image" src="https://github.com/user-attachments/assets/33e4f87e-c122-4fed-8e62-89ad083a9781" />


The moment we enter the site, we get prompted with a login page, I Try a baisc SQL Injection ( ' or 1=1-- )- The first (') is to close the opening quote of the original SQL Query, Then we add a new condition which is ( OR ), and we make it 1=1, And 1=1 is ALWAYS TRUE. and the (--) is to comment anything afterwards, so even the password does not matter.

So, The final SQL Query is going to be 
From:
    SELECT * FROM USERS WHERE username = ' USER INPUT ' AND password = 'USER INPUT';
To:
    SELECT * FROM USERS WHERE username = '' or 1=1--<h1 style="color: green">AND  PASSWORD = 'asdadsdaadx';</h1>
<img width="1130" height="337" alt="image" src="https://github.com/user-attachments/assets/a65faff7-36dc-4e98-8061-d358cdc47eba" />

And just like that we are in!
