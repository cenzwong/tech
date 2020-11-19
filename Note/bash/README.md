# Everything about terminal
# How to sudo install without ask me question
```bash
sudo DEBIAN_FRONTEND=noninteractive apt-get -yq install [packagename]
```

# Bash Scripting Note

Bash is the subclass of shell
```bash
which bash
/usr/bin/bash

which sh
/usr/bin/sh

file -h /usr/bin/sh
/usr/bin/sh: symbolic link to dash
```
https://medium.com/100-days-of-linux/bash-vs-sh-whats-your-take-3e886e4c1cbc
sh (shell command Language)is a programming language as described by POSIX standards.
Bash, short for Bourne Again Shell, is a sh-compatible implementation that is written for the GNU project, as a replacement for the Bourne Shell.

```bash
#!/bin/bash
```
#!: Hashbang/Shebang
/Path/to/Bash/Executable

## Linux Multi-line scripts
```bash
man xyz
echo $BASH_VERSION
```

# Histroy
- 1971: Thompson Shell (first UNX shell)
- 1975: Mashey Shell
- 1977: Bourne Shell (sh)
- 1978: C Shell (csh) ~ tcsh, dsh, 
- 1989: Bourne Again Shell (Bash): default MAC LINUX

# Review Common Bash Commands
```bash
pwd #current directory
ls -l #list the file in _ directory
# drwxrwxrwx : means it is directory and read write modify vs -rwxrwxr-x (File)
mkdir dirname
rmdir dirname
clear
more file.txt # You can scroll file
head file.txt # head of the file
tail file.txt # end of the file
touch {apple, banana}
touch file_{1..1000} # this will create 1000 file
touch file_{01..1000} # this will create 1000 file with zero padding in the front
echo {1..10..2} # 1 3 5 7 9
wc -l # word count
ls | more
cp -v * ../otherFolder 1>../success.txt 2> ../error.txt # copy with logging, success go to success.txt etc
cp -v * ../otherFolder &> ../log.txt # copy all
/dev/null # is a blackhole for you to send thing

grep --color=auto cenz auth.log
grep -i break-in auth.log # -i case insensitive
grep -i break-in auth.log | awk {'print $12'} # print the 12 thing awk: pattern scanning and text processing lang
sed # stream editor for filtering and transforming text

ping -c 1 example.com | grep 'bytes from' | cut -d = -f 4
# the grep will return a whole line, the cut will split according to delimitor -d and find the forth thing

~- # represent the path you just in
```

## Bash Script
```bash
#!/bin/bash
# This is a basic bash script in my.sh

```

```bash
# To run the script
bash my.sh
chomod +x my.sh
./my.sh
# if you put the script inside the /usr/bin you can run the script whenever you are

echo $greeting, world \(planet\)!
echo '$greeting, world (planet)!'
echo "$greeting, world (planet)!"
# theese three result is different

var=hello # no sapce!
str="mystring"
num=16

declare -i d=123 # d must be integer
declare -r e=456 # e is read-only
declare -l f="LOLCats" # f now all lowercase
declare -u g="LoLcats" # g now all uppercase

$HOME # Home dir
$PWD # current direct
$MACHTYPE # return machine type
$HOSTNAME # return system name
$BASH_VERSION
$SECONDS # second of the session open or script
$0 # contain the name of the script
$? # return value
$RANDOM # bash random variable
```

```bash
# command substiution it will run the command
d=$(pwd)
echo $d

val=$((expression))
# expression not floating point , you need to use bc program
e++
e--
e+=5
$(echo 1/3 | bc -l)

# string operator
[[ $a <= $b ]]
[[ $a != $b ]]
[[ 20 > 100 ]] # this is string compare
[[ -z $a ]]
[[ -n $a ]]

# numeric operator
[[ $a -lt $b ]]
[[ $a -gt $b ]]
[[ $a -le $b ]]
[[ $a -ge $b ]]
[[ $a -eq $b ]]
[[ $a -ne $b ]]

# Logic Operator
[[ $a && $b ]]
[[ $a || $b ]]
[[ ! $b ]]


a="hello"
b="world"
c=$a$b # c --> helloworld
${#a} # --> 5
${c:3:4} # --> lowo
${c: -3:4} # --> the space is needed
${fruit/banana/durian} # In fruit, find the first banana and replace to durain
${fruit//banana/durian} # In fruit, find the first banana and replace to durain
${fruit/#banana/durian} # In fruit, find the banana only if it is first place and replace to durain
${fruit/%banana/durian} # In fruit, find the banana only if it is last place and replace to durain

# Colored Text
echo -e '\033[34;42mColorText\033[0m'
# echo -e : Echo with escaping
# \033[5;34;42m  # 34, 42 is foreground background
# \033[0m # Clear all the format

# or using program tput : man terminfo
tput

# date (is not a part of bash)
man date
date
date + "%d-%m-%Y"

# printf (Check the format specifier)
printf "Name:\t%s\nID:\t%04d\n" "Scot" "12"
printf -v d "" # this will assing to d

# array (bash4+)
a=()
b=("apple" "banana")
a[5]="wiki" # still okay
b+=("mango") # add to array
${[@]} # whole array
${[@]: -1} # last element
declare -A myarray
myarray[color]=blue
myarray["office building"]="HQ West"
echo ${myarray["office building"]} is ${myarray[color]}

# text file
echo "Some text" > file.txt # replace
echo "Some text" >> file.txt # concat

i=1
while read f; do
    echo "Line $i: $f"
    ((i++))
done < file.txt

cat < myfile.txt
ftp -n < myftpcommand.txt

# EndOfText can be any string you like
cat <<- EndOfText 
    This will be instruction
    Second line
EndOfText

# Control Struction
# expression , []  [[]] ((Interger Comparation)) __
if expression
then
    echo "True"
elif expression2; then
    echo "False"
fi
# Regular expression

i=0
while [$i -le 10]; do
    echo i:$i
    ((i+=1))
done

j=0
until [ $j -ge 10 ]; do
    echo j:$j
    ((j+=1))
done

for i in 1 2 3
do
    echo $i
done

for i in {1..100..2}
do
    echo $i
done

for ((i=1; i<=10; i++))
do
    echo $i
done

arr=("apple" "banana" "cherry")
for i in ${arr[@]}
do
    echo $i
done

declare -A arr
arr["name"]="Cenz"
arr["id"]="1234"
for i in "${!arr[@]}"
do
    echo "$i: ${arr[$i]}"
done
# name, id

# Case
a="dog"
case $a in
    cat) echo "This is cat";;
    dog|puppy echo "This is dog";;
    *) echo "default";;
esac

# Function
function greet {
    echo "Hello World"
}
greet

function greet {
    echo "Hello $1"
}
greet Cenz

function numberthings {
    i=1
    for f in $@;do
        echo $i: $f
        ((i+=1))
    done
}
numberthings $(ls)

# input
echo $1 # the first argument
$@ # array of argument
$# # number of argument

# -u -p need option, -a -b no need option, : in the front means unknow
while getopts :u:p:ab option; do
    case $option in
        u) user=$OPTARG;;
        p) pass=$OPTARG;;
        a) echo "flag got";;
        ?) echo "unknown flag with $OPTARG is!";;
    esac
done
# ./my.sh -u scott -p secret

# Question
echo "What is your name?"
read name

echo "Password"
read -s pass

echo -p "THis is one line question?" animal

select animal in "cat" "dog" "bird" "fish"
do
    echo "You selected $animal"
    break
done

select option in "cat" "dog" "quit"
do
    case $option in
        cat) echo "You select Cat";;
        dog) echo "You select Dog";;
        quit) break;;
        *) "Wrong input";;
    esac
done

if [ $# -lt 3]; then
    cat <<- EndOfText
        This requires three arguments:
        username, userid, and favorite number.
EndOfText
    
else
    echo "$1 $2 $3"
fi

read -p "Favorite animal? [cat] " a
while [[ -z "$a" ]]; do
    a="cat"
done
echo "$a was selected."


```


# How to run command without selection
DEBIAN_FRONTEND="noninteractive" apt-get install --yes python-opencv
