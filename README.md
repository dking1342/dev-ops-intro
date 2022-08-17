# Anisble Crash Course

## Documentation
Documentation for Ansible can be found [here](https://www.ansible.com/). A video documentation can be found [here](https://www.youtube.com/watch?v=EcnqJbxBcM0&list=WL&index=2) and [here](https://www.youtube.com/watch?v=5hycyr-8EKs&list=LL&index=1&t=1148s).

## Explanation
Covers the basics and fundamentals of Ansible. The files in the code base show an example playbook that can be used. The Ansible application is used on the cloud or with servers which precludes any other code.

## Example
### Server Inventory
```
[webserver name]
alpha.example.org
beta.example.org
192.168.1.100
192.168.1.110
```

This will initialize the inventory of affected servers. The group name will be in the square brackets. The list below is the client server IP addresses.

### Playbook
```
---
  - name: iluvnano
    host: centos
    tasks: 
      - name: ensure nano is there
        yum: 
          name: nano
          state: latest
```

### Ansible on server
Use this command to run the playbook on the server
```
ansible-playbook <yml file> --syntax-check
```

After everything has run then check the recap for the status.