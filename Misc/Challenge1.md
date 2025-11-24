<script src="/style.js"></script>

---
# PatriotCTF 2025 – Misc Challenges Writeups
**Challenge 1: Reverse Metadata Part 1**  
**Author:** [Syndro/Ayco]  
**Category:** Misc  

----

<img width="491" height="613" alt="image" src="https://github.com/user-attachments/assets/6550504a-1e15-4339-aa04-4c811b75b0d6" />

---
### 1- Upload page
At first, We are greeted by an upload page,I Checked the page source, and it doesnt look like it requires a specfic extension.

| Initial Page  | Source page |
| ------------- | ------------- |
| <img width="441" height="209" alt="image" src="https://github.com/user-attachments/assets/420f4536-a676-4eb6-b30a-4d6b760961f5" />  | <img width="397" height="206" alt="image" src="https://github.com/user-attachments/assets/93d98d98-ce2e-4462-997c-0c46931c5812" />
  |

---
### 2- Deploying the attack.

I Tried to upload a PHP Shell and it said it got uploaded Successfully! <br>

We dont get information back other than its being stored, So what if we try to navigate to /Uploads/Filename ?

And luckily it worked and now we have a shell on the server ! <br>

| Uploaded  | File |
| ------------- | ------------- |
| <img width="380" height="185" alt="image" src="https://github.com/user-attachments/assets/eec01e40-edc0-469a-9e37-1f85669bfddf" /> | <img width="600" height="1042" alt="image" src="https://github.com/user-attachments/assets/7f667e88-f38f-4b7d-89da-d662e96c6e80" />

---
### 3- Caputring it!

We have a shell at the site, its pretty much solved.

i first 'ls' the directory, And i find a flag2.txt, I try to cat it, And there it is, The flag <br>
(Someone was just doing rm * every few minutes to grief the challenge, so sometimes when u ls, u wont find the flag.<br>
<img width="1915" height="1040" alt="image" src="https://github.com/user-attachments/assets/c50c112b-3a8a-4fc3-bbb7-42715a07d8d6" />





