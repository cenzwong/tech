# OpenMP (Multiprocessing)
- An API for shared-memory parallel programming

# Helloworld
```c
gcc −g −Wall −fopenmp −o omp_hello omp_hello . c
./omp_hello 4
```

```c
#include <stdio.h>
#include <stdlib.h>
#include <omp.h>   

void Hello(void);  /* Thread function */

/*--------------------------------------------------------------------*/
int main(int argc, char* argv[]) {
   int thread_count = strtol(argv[1], NULL, 10); 

   //omp_set_num_threads(thread_count);
#  pragma omp parallel num_threads(thread_count) 
   Hello();

   return 0; 
}  /* main */

/*-------------------------------------------------------------------
 * Function:    Hello
 * Purpose:     Thread function that prints message
 */
void Hello(void) {
   int my_rank = omp_get_thread_num();
   int thread_count = omp_get_num_threads();

   printf("Hello from thread %d of %d\n", my_rank, thread_count);

}  /* Hello */
```
# API
```c
#include <omp.h>
#pragma //add before the openMP funciton
```
```c
#pragma omp parallel num_threads(thread_count)

//inside omp function
int my_rank = omp_get_thread_num();
int thread_count = omp_get_num_threads();
```
- better 
```c
#ifdef _OPENMP
  #include <omp.h>
#endif

#ifdef _OPENMP
  int my_rank = omp_get_thread_num();
  int thread_count = omp_get_num_threads();
#else
  int my_rank = 0;
  int thread_count = 1;
#endif

```
## Mutex
```c
#pragma omp critical
#pragma omp critical(name)

#pragma omp  atomic // only on C assignment

omp_set_lock(&var->lock);
omp_unset_lock(&var->lock);
```
## reduce
```c
#pragma omp reduction(<operatir>:<variable list)
//example
global_result = 0.0;
#pragma omp parallel num_threads(thread_count) reduction(+: global_result)
global_result +=Local_trap(double a, double b, int n);
```                                       
```c
#pragma omp reduction(<operatir>:<variable list)
//example
#pragma omp parallel for num_threads(thread_count) reduction(+: global_result)
for(){
   ...
}
```
![image](https://user-images.githubusercontent.com/44856918/119015564-9852e080-b9cb-11eb-8394-fb6ef6ed2af8.png)
- the ```i``` can only be modify thread the increment expression.

```c
#pragma omp parallel default(none) //this clear all the scope
#pragma omp parallel private(var_pri_scop) shared(n)
```
## The Schedule Clause
```c
#pragma omp parallel for schedule(type,chunksize)
// OMP_SCHEDULE is a environment variable to set for the schedule
```


![image](https://user-images.githubusercontent.com/44856918/119017034-29768700-b9cd-11eb-8132-004774c7cee4.png)

type:
- static
- dynamic or guided
- auto
- runtime

## Queues
```c
#pragma omp critical
Enqueue(queue, dest, my_rank, mesg);

#pragma omp critical
Dequeue(queue, &src, &mesg);
```
## Barrier
```c
#pragma omp barrier
```
