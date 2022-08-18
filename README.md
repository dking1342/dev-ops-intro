# SSH Crash Course

## Documentation
Documentation for SSH can be found [here](https://www.youtube.com/watch?v=hQWRp-FdTpc&list=WL&index=2)

## Explanation
An overview of SSH and the basics and fundamental use cases.

## Examples
### Authentication methods
- password
- public / private key pair
- host based
Example:
```
ssh kavooce@192.168.1.29
```

The requested password would be the password for the server and not the client computer.

### Generate SSH key
Command: 
```
ssh-keygen
```
- ~/.ssh/id_rsa (private key)
- ~/.ssh/id_rsa.pub (public key)
- public key goes into server "authorized_keys" file

### Add keys
Copy the public key to the server using the command: 
```
cat ~/.ssh/id_rsa.pub | ssh kavooce@192.168.1.29 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### Login with new key
If you need to add an ssh key to the client computer that is required for the server use this command:
```
ssh-add ~/.ssh/id_rsa_do
```
This assumes that you have already created a new ssh key using the ssh-keygen command earlier and there is a id_rsa_do.pub file already there. That public key would have already been registered with the server.

### Server setup
When first logging into your server you want to make sure that all the packages are using the latest versions. If you are using a unix OS then you can use the apt package manager to do this. Otherwise use the package manager that is being used on the OS. Update and upgrade.

### Make new user
You don't want to use to use the root user when you are on a server for security purposes. To make a new user use this command:
```
adduser kavooce
```

Then type in a password, then enter through the rest of the options. To make this user a super user type the command:
```
usermod -aG sudo kavooce
```
To check the user settings type the command:
```
id kavooce
```

Every user needs their own ssh key so you will need to make a new ssh key for each user. Go on the server and make the folder structure to put a new ssh key. Then you can log in with that user using the respective ssh key.

