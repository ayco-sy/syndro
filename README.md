# PatriotCTF2025-Web
Writeups for web-challenges Partriot-CTF

# Challenge-1: Connection Tester
<img width="491" height="461" alt="image" src="https://github.com/user-attachments/assets/33e4f87e-c122-4fed-8e62-89ad083a9781" />


The moment we enter the site, we get prompted with a login page, I Try a baisc SQL Injection ( ' or 1=1-- )- The first (') is to close the opening quote of the original SQL Query, Then we add a new condition which is ( OR ), and we make it 1=1, And 1=1 is ALWAYS TRUE. and the (--) is to comment anything afterwards, so even the password does not matter.

So, The final SQL Query is going to be <br>
From:- 
```sql
SELECT * FROM USERS WHERE
username = ' USER INPUT ' AND password = 'USER INPUT';
To:- 
SELECT * FROM USERS 
WHERE username = '' OR 1=1 -- AND PASSWORD = '1234';
                           ⬆️
                      We ignore everything after the comment
```
<img width="1130" height="337" alt="image" src="https://github.com/user-attachments/assets/a65faff7-36dc-4e98-8061-d358cdc47eba" />

<h3>And just like that we are in!, Afterward, we are greeted by a dashboard; </h3>

<img width="1173" height="214" alt="image" src="https://github.com/user-attachments/assets/c2bff44f-8c36-4746-ac58-ad952f87d2f9" />


<h4>I try something like pinging localhost ( 127.0.0.1 )</h4> <br>
<img width="1148" height="296" alt="image" src="https://github.com/user-attachments/assets/1ca19992-a9d2-4d83-a60c-9568bb2ae8c9" /> <br>
<h4>if this works like a shell command ping, How do i add some malicious commands into it ?</h4> <br>
<h4>After 1 google search, It is done by logical operators AND/OR ( there is more but this will do for now ),</h4> <br>
<h4>( || OR), at first i try 127.0.0.1||ls, But it doesnt work</h4> <br>
<h4>(&& AND) Then i try this, and output !, but it is not what i expected </h4><img width="1162" height="312" alt="image" src="https://github.com/user-attachments/assets/23478a2d-d22c-4934-b008-a43fb068a071" />
