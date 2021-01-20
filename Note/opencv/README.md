# OpenCV

There is a lot of unofficial package, which sometimes works or not

## Method one (Python)

https://pypi.org/project/opencv-python/
Unofficial pre-built CPU-only OpenCV packages for Python.
```bash
pip install opencv-python
```
This sometimes work on linux and when you run this on linux, immediately you can get the import cv2

## Method two (Python)
Installing OpenCV-Python from Pre-built Binaries
This method serves best when using just for programming and developing OpenCV applications.
```bash
sudo apt-get install python-opencv
```
```py
import cv2 as cv
print(cv.__version__)
```
Apt repositories may not contain the latest version of OpenCV always

## Method three

https://packages.ubuntu.com/bionic/libopencv-dev
development files for opencv
```bash
sudo apt install libopencv-dev
```
## Method Four
https://www.pyimagesearch.com/2018/09/19/pip-install-opencv/
