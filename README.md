
# GenerateToken()

In order to **generate a token**, first you need to to generate a **RSA Key Pair**. Open a new terminal, 
**install** `openssl` if you don't have it on your computer, and **run the following command**.

```bash
  openssl genrsa -out private.pem 2048
```
Once the private key is generated, **run the following command** to export the **RSA public
key** to a file.

```bash
  openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```

Rename `private.pem` and `private.pem` to `.key` and paste them into `/tools`.

Then **run the following command** 
in the terminal to **generate the token**.

```bash
  npm run token <userId> <name>
```
