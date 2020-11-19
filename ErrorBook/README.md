# Error Book

## Python
### Error happen after running pip install opencv-python and run import cv2
```bash
ImportError: libGL.so.1: cannot open shared object file: No such file or directory
```
Solution:
```
https://stackoverflow.com/questions/55313610/importerror-libgl-so-1-cannot-open-shared-object-file-no-such-file-or-directo
```
### Got lock
E: Could not get lock /var/lib/dpkg/lock – open (11: Resource temporarily unavailable)
E: Unable to lock the administration directory (/var/lib/dpkg/), is another process using it?

```bash
!ps aux | grep -i apt
# !kill 7098
!dpkg --configure -a
```
