# PatriotCTF2025-Web
Writeups for web-challenges Partriot-CTF

# Challenge-2: Trust Vault

<img width="497" height="450" alt="image" src="https://github.com/user-attachments/assets/aa873df1-6055-4ed9-9129-aefebebdbef0" />

<h4>The challenge info already gives us enough info, Jinja which is a python template,and vulnerable SQL query, It most likely suggests sending a SSTI through SQL injection</h4>
<img width="288" height="352" alt="image" src="https://github.com/user-attachments/assets/c05405f7-f665-4f36-baa4-0cfed99df6ec" />
<h4>It asks for a username and password, i just created a random get-go account and logged in, The first thing i see is 4 tabs on the top </h4>
<img width="312" height="52" alt="image" src="https://github.com/user-attachments/assets/df9a14c6-ea35-4c40-ad51-4ce70c7b471e" />
<img width="299" height="239" alt="image" src="https://github.com/user-attachments/assets/ea481d4c-22fc-4a9d-a0c9-59d837e0fff1" />
<img width="298" height="114" alt="image" src="https://github.com/user-attachments/assets/05a674e7-00ec-4863-9b1f-ee195185cfdc" />

<h3>Bookmarks, is where we actually are going to try and inject it.
Audit, is just audit log of other guys ( we are not using it, i personally dont know why they even add this. );
reports, useless.
I go into Bookmarks, I see an input field, i try to input a basic payload, {{7*7}}, But its just getting copy pasted back to me.</h3>
<h3>Then i try to view page sources of every page, and i come accross this</h3>
<img width="464" height="73" alt="image" src="https://github.com/user-attachments/assets/7754ef73-2dd4-44d3-9ac7-7b570cba4147" />
<h3>I Found it in the bookmarks source code, I Follow it To (18.212.136.134:5001/search), And we see our bookmarks and we can execute them through here!</h3>
<img width="614" height="400" alt="image" src="https://github.com/user-attachments/assets/b6233952-8bf2-4052-91b7-25e3f6675dc7" />
<h3>We do a simple payload to make sure its jinja, And yes its jinja2 template.</h3>
<h3>Ok, Now lets do A simple UNION injection followed up by our SSTI payload.</h3>
<pre> ' UNION SELECT "{{ self.__init__.__globals__.__builtins__.__import__('os').popen('Command here!').read() }}" -- ``` </pre>
