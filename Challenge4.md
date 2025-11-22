# PatriotCTF2025-Web
Writeups for web-challenges Partriot-CTF

# Challenge-4: Trust Fall
<img width="491" height="420" alt="image" src="https://github.com/user-attachments/assets/2eb922bd-6e5f-4032-95b6-0d94a1cccead" />
<h3>This was by far my favorite challenge.</h3>
<h3>From the get-go, We have zero info,zero nothing but a placeholder for username&password </h3>
<img width="504" height="382" alt="image" src="https://github.com/user-attachments/assets/874c593c-3c6c-4520-b818-e066f94e3c9a" />
<h3>At first, i try to maybe sql inject it so it logins me to first user which is usually the admin, didnt work.</h3>
<h3>I Inspected the page, Network tab, And source, Nothing useful.</h3>
<h3>So, i just logged in with the placeholders.</h3>
<img width="1912" height="1000" alt="image" src="https://github.com/user-attachments/assets/d6bc4b7c-55ad-4fcf-857c-b396d0555631" />
<h3>This is the index page, Nothing to interact with other than clicking on products.</h3>
<h3>There is an admin console on bottom right, Most likely that is our goal.</h3>
<h3>I try to click it, No success,I Get forbidden!</h3>
<h3>I Then see that we have a signed cookie, Then i wonder if i just delete it since modifying it is almost impossible since we have no idea what the signature is. </h3>
<h3>I Deleted and i can access it, Authorization gained, But, it does nothing. I Check the source code and i find this.</h3>
<img width="561" height="492" alt="image" src="https://github.com/user-attachments/assets/1dbfc75d-ecdc-4a4c-bf5e-20b6bd5a65b2" />
<h3>What this basically mean, its garbage, its just UX.</h3>
<h3>Then i inspect the Network tab and i find quite few useful things.</h3>
<img width="1919" height="414" alt="image" src="https://github.com/user-attachments/assets/5741c3ba-b057-4f54-8b5b-db8715328d67" />
<h3>We see that app.js&styles.css are being called from IP/assets/ITEM</h3>
<h3>So i was wondering what if i just try to access it by typing to the the URL, and if success, Can i use ffuf to maybe find a hidden directory?</h3>
<h3>I Do that, and luckily yes i can access it and try to bruteforce, But no luck.</h3>
<h3>Then i go to check the other thing, Which is the API Call to products</h3>
<img width="1918" height="1035" alt="image" src="https://github.com/user-attachments/assets/37770824-b42a-4c6e-9697-7c6357170349" />
<h3>Okay, its pretty much same case as assets, i can maybe try to FUZZ API endpoint using ZAP</h3>
<pre>Payload ---> https://gist.github.com/yassineaboukir/8e12adefbd505ef704674ad6ad48743d </pre>
<h3>Here is what we are going to do,</h3>
<img width="876" height="587" alt="image" src="https://github.com/user-attachments/assets/883354b4-50c3-4cf7-9413-749d0f1e84c8" />
<h3> Our Url is going to be like this, We select "Products", And we add our payload list. And the Q is just incase we find it, we dont wanna miss out</h3>
<h3>Then, We go to our message processor, And we add the following. Since it ALWAYS givesu us 302 FOUND, and redirects us to login, it might confuse us a lil, so we might take care of it</h3>
<h3>We add this</h3>
<img width="849" height="577" alt="image" src="https://github.com/user-attachments/assets/2d60e86f-70e2-44e7-91b0-f60dc2857802" />
<h3>Which means, Any site found with /login, it flags it with BAD</h3>
<h3>Okay lets run it and see what we get.</h3>
<img width="1906" height="485" alt="image" src="https://github.com/user-attachments/assets/f22b6ce7-b3d4-4250-8622-de9d9d02cb24" />
<h3>And we found users!</h3>
<img width="1315" height="457" alt="image" src="https://github.com/user-attachments/assets/87e2c8d7-df01-4af0-b9ef-254f67cd07bd" />

<h3>Says invalid ID, If we go back to our main page, We see that products are updated by IDS, perhaps that is the winning key.</h3>
<img width="773" height="356" alt="image" src="https://github.com/user-attachments/assets/2f80f0a6-0d4d-4a35-9411-8e603f12d2f4" />
<h3>So we try with, 1, 2, 3, But no luck, just role and username, But then when i try user 0, i get the flag!</h3>
<img width="1321" height="510" alt="image" src="https://github.com/user-attachments/assets/74aed047-fe8e-441e-9eb2-36eb8e71e0e3" />

