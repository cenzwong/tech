# CUDA (Compute Unified Device Architecture) C Programming Model

## Host code and Device code (kernel)
- Host code: executed on the CPU
- Device code: executed on the GPU



## CUDA Threads: Grids, Blocks
![image](https://user-images.githubusercontent.com/44856918/119154527-d3fdb100-ba84-11eb-8784-5686473972c0.png)
Each kernel corresponds to a grid of threads
Each grid consists of multiple thread blocks
Each thread block contains multiple threads

A grid consists of 3-dimension blocks ``` gridDim.x ```
A threads block contains threads organized in 1-3 dimensions ``` blockDim.x ```

```c
kernelName<<<#block, #thread, shared_size, s>>>(param1, param2)
```
block: number of thread blocks in the grid
thread; number of threads per block
shared_size: size of shared memory per block, default 0
s: the associated stream, default 0

## CUDA memory allocation and copy
```c
cudaMalloc(devPtr, size)
cudaFree(devPtr)
cudaMemcpy(dst, src, size, direction)
// direction: cudaMemcpyHostToDevice, cudaMemcpyDeviceToHost
```

## Kernel programs and their invocation
