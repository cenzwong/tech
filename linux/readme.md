# Linux

## apt
```
# change the repo from hk to global
sudo sed -i -e 's,http://hk.archive.ubuntu.com/ubuntu,http://archive.ubuntu.com/ubuntu,g' /etc/apt/sources.list
sudo apt update && sudo apt upgrade -y
```

## Check Process
```
nvidia-smi
top
htop
jps # java process
```

## Disk 
```
lsblk
df

fdisk
mkfs
mkdir
mount
unmount
```

## file copy
```
scp text.txt admin@192.168.0.10:~
```

## adding pathh
```
sudoedit /etc/environment
source /etc/environment
```

## port scan
```
nmap -F 172.16.10.50-60
```
