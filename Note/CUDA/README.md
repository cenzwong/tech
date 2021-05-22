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
block: number of thread blocks in the grid, up to 65535 blocks
thread; number of threads per block, up to 1024 threads per block
shared_size: size of shared memory per block, default 0
s: the associated stream, default 0

## CUDA memory allocation and copy
```c
cudaMalloc(devPtr, size)
cudaFree(devPtr)
cudaMemcpy(dst, src, size, direction)
// direction: cudaMemcpyHostToDevice, cudaMemcpyDeviceToHost
```
Registers: only available within a thread
Shared memory: accessed by threads in the same thread block
Global memory: can be accessed by all threads
![image](https://user-images.githubusercontent.com/44856918/119212044-992d6480-bae8-11eb-82ab-9be8ddcdf036.png)
![image](https://user-images.githubusercontent.com/44856918/119212050-9f234580-bae8-11eb-846d-4156b42b5e7d.png)
![image](https://user-images.githubusercontent.com/44856918/119212207-5cae3880-bae9-11eb-8d74-8c753a12aa1e.png)
```c
extern __shared__float d_s_array[]; //or allocated from global device function.
```

### Coalesced Access
```c
t1 t2 t1 t2 t1 t2 t1 t2
```

## Kernel programs and their invocation
```c
int tid = blockDim.x * blockIdx.x + threadIdx.x;
int nthread = blockDim.x*gridDim.x;

__syncthreads();
```
## Data aggregation
![image](https://user-images.githubusercontent.com/44856918/119212359-5a98a980-baea-11eb-96e9-1f797c7f4e17.png)
