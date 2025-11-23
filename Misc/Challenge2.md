# PatriotCTF 2025 – Misc Challenges Writeups
**Challenge 2: Reverse Metadata Part 2**  
**Author:** [Syndro/Ayco]  
**Category:** Misc  

----

<img width="485" height="635" alt="image" src="https://github.com/user-attachments/assets/0c2d9072-8fff-466b-a683-e2cccbbfd49c" />

---

### 1- Start

This one is an exact replica of challenge 1, Same principles and concept

So we upload our shell and we go from there

---

### 2- Flag discovery

We first 'ls', But nothing useful so far.<br>
So, i think what if i 'ls' backwards? ls ../.. <br>

<img width="1919" height="1046" alt="image" src="https://github.com/user-attachments/assets/ec54d5c4-26bc-4d46-9a9e-936edc47b16a" /> <br>

We keep navigating using 'ls -la' incase there is any hidden files, until we come across the log directory.

<img width="489" height="184" alt="image" src="https://github.com/user-attachments/assets/8152e2ba-3484-4330-8e6b-9065fab8bb06" />


Then i try to check the 'ctf-monitor/processes.log' with various greps, <br>
<pre>
  grep -i "MASONCC{",
  grep -i "flag{",
  grep -i "flag",
  grep -i "pctf{"
</pre>

---

### Flag!

After i did 
<pre>
  strings ../../../log/ctf-monitor/processes.log | grep -i "pctf{"
</pre>

I Finally got the flag back!

<img width="1849" height="188" alt="image" src="https://github.com/user-attachments/assets/ea786880-85ef-4670-a95b-9b73253a5bfd" />
